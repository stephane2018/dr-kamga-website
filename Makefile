# Makefile for Quastrom Trust CI/CD Pipeline
# Requires: Node.js, npm, ssh, scp, tar

.PHONY: help install quality-check security-audit build-staging build-production package verify-build setup-ssh deploy verify-deployment rollback clean

# Default target
help:
	@echo "Available targets:"
	@echo "  install          - Install npm dependencies"
	@echo "  quality-check    - Run linting and code quality checks"
	@echo "  security-audit   - Run security audits"
	@echo "  build-staging    - Build application for staging"
	@echo "  build-production - Build application for production"
	@echo "  package          - Package build artifacts"
	@echo "  verify-build     - Verify build artifacts"
	@echo "  setup-ssh        - Setup SSH known hosts"
	@echo "  deploy           - Deploy to server"
	@echo "  verify-deployment- Verify deployment success"
	@echo "  rollback         - Rollback to previous deployment"
	@echo "  clean            - Clean build artifacts"

# Variables with defaults
NODE_ENV ?= development
ARTIFACT_NAME ?= quastrom-trust-dev-build
REVISION ?= $(shell git rev-parse HEAD 2>/dev/null || echo "unknown")
SERVER_PATH ?= /var/www/trust.quastrom.com/dev
SSH_HOST ?= localhost
SSH_USER ?= deploy
SSH_PORT ?= 22
ENVIRONMENT ?= development
KEEP_RELEASES ?= 3
PORT ?= 3000

# Installation
install:
	@echo "Installing dependencies..."
	npm ci
	@echo "Dependencies installed successfully"

# Quality checks
quality-check:
	@echo "Running ESLint..."
	npm run lint
	@echo "Checking for outdated dependencies..."
	npm outdated --depth=0 || true
	@echo "Quality checks completed"

# Security audit
security-audit:
	@echo "Running security audit..."
	npm audit --audit-level=moderate
	@echo "Checking for known vulnerabilities..."
	npm audit --audit-level=high --json | jq '.vulnerabilities | length' > /dev/null 2>&1 || true
	@echo "Security audit completed"

# Build targets
build-staging:
	@echo "Building application for staging..."
	@test -n "$(NODE_ENV)" || (echo "NODE_ENV not set" && exit 1)
	NODE_ENV=staging npm run build
	@test -d .next/standalone || (echo "Build failed: .next/standalone not found" && exit 1)
	@echo "Staging build completed successfully"

build-production:
	@echo "Building application for production..."
	@test -n "$(NODE_ENV)" || (echo "NODE_ENV not set" && exit 1)
	NODE_ENV=production npm run build
	@test -d .next/standalone || (echo "Build failed: .next/standalone not found" && exit 1)
	@echo "Production build completed successfully"

# Package build artifacts
package:
	@echo "Packaging build artifacts..."
	@test -n "$(ARTIFACT_NAME)" || (echo "ARTIFACT_NAME not set" && exit 1)
	@test -n "$(REVISION)" || (echo "REVISION not set" && exit 1)

	# Create package directory
	mkdir -p package

	# Copy build artifacts
	@test -d .next/standalone || (echo "Build not found: run build first" && exit 1)
	cp -r .next/standalone package/
	cp -r .next/static package/
	cp -r ecosystem.config.js package/

	# Copy public directory if it exists
	@if [ -d public ]; then cp -r public package/; fi

	# Add metadata
	echo "$(REVISION)" > package/REVISION
	echo "$(shell date -u +%Y-%m-%dT%H:%M:%SZ)" > package/BUILD_TIME
	echo "$(ENVIRONMENT)" > package/ENVIRONMENT

	# Create tarball
	tar -C package -czf $(ARTIFACT_NAME).tar.gz .

	# Cleanup temporary directory
	rm -rf package

	@echo "Package created: $(ARTIFACT_NAME).tar.gz"

# Verify build artifacts
verify-build:
	@echo "Verifying build artifacts..."
	@test -n "$(ARTIFACT_NAME)" || (echo "ARTIFACT_NAME not set" && exit 1)
	@test -f $(ARTIFACT_NAME).tar.gz || (echo "Artifact not found: $(ARTIFACT_NAME).tar.gz" && exit 1)

	# Check tarball contents
	@tar -tzf $(ARTIFACT_NAME).tar.gz | grep -q "standalone" || (echo "Missing standalone directory" && exit 1)
	@tar -tzf $(ARTIFACT_NAME).tar.gz | grep -q "static" || (echo "Missing static directory" && exit 1)
	@tar -tzf $(ARTIFACT_NAME).tar.gz | grep -q "REVISION" || (echo "Missing REVISION file" && exit 1)

	# Check file size (should be > 1MB for a real Next.js app)
	@size=$$(stat -f%z $(ARTIFACT_NAME).tar.gz 2>/dev/null || stat -c%s $(ARTIFACT_NAME).tar.gz); \
	if [ $$size -lt 1048576 ]; then \
		echo "Warning: Artifact seems too small ($$size bytes)"; \
	fi

	@echo "Build artifacts verified successfully"

# Setup SSH known hosts
setup-ssh:
	@echo "Setting up SSH known hosts..."
	@test -n "$(SSH_HOST)" || (echo "SSH_HOST not set" && exit 1)
	@test -n "$(SSH_PORT)" || (echo "SSH_PORT not set" && exit 1)

	mkdir -p ~/.ssh
	ssh-keyscan -p $(SSH_PORT) $(SSH_HOST) >> ~/.ssh/known_hosts 2>/dev/null || true

	@echo "SSH known hosts configured"

# Deploy to server
deploy:
	@echo "Starting deployment..."
	@test -n "$(ARTIFACT_NAME)" || (echo "ARTIFACT_NAME not set" && exit 1)
	@test -n "$(REVISION)" || (echo "REVISION not set" && exit 1)
	@test -n "$(SERVER_PATH)" || (echo "SERVER_PATH not set" && exit 1)
	@test -n "$(SSH_HOST)" || (echo "SSH_HOST not set" && exit 1)
	@test -n "$(SSH_USER)" || (echo "SSH_USER not set" && exit 1)
	@test -f $(ARTIFACT_NAME).tar.gz || (echo "Artifact not found: $(ARTIFACT_NAME).tar.gz" && exit 1)

	# Upload artifact
	@echo "Uploading artifact..."
	scp -p $(SSH_PORT) ./$(ARTIFACT_NAME).tar.gz $(SSH_USER)@$(SSH_HOST):$(SERVER_PATH)/releases/$(REVISION).tar.gz

	# Deploy via SSH script
	@echo "Deploying on server..."
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) 'bash -s' < scripts/deploy.sh $(SSH_USER) $(SERVER_PATH) $(REVISION) $(ENVIRONMENT) $(KEEP_RELEASES) $(PORT)

	@echo "Deployment completed"

# Verify deployment
verify-deployment:
	@echo "Verifying deployment..."
	@test -n "$(SERVER_PATH)" || (echo "SERVER_PATH not set" && exit 1)
	@test -n "$(SSH_HOST)" || (echo "SSH_HOST not set" && exit 1)
	@test -n "$(SSH_USER)" || (echo "SSH_USER not set" && exit 1)
	@test -n "$(REVISION)" || (echo "REVISION not set" && exit 1)

	# Check if current symlink points to the right release
	current_release=$$(ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "readlink $(SERVER_PATH)/current"); \
	expected_path="$(SERVER_PATH)/releases/$(REVISION)"; \
	if [ "$$current_release" != "$$expected_path" ]; then \
		echo "Deployment verification failed: current symlink points to $$current_release, expected $$expected_path"; \
		exit 1; \
	fi

	# Check if PM2 process is running
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "cd $(SERVER_PATH) && pm2 status | grep -q online" || \
		(echo "PM2 process not running" && exit 1)

	# Basic health check (if health endpoint exists)
	@echo "Deployment verified successfully"

# Rollback deployment
rollback:
	@echo "Starting rollback..."
	@test -n "$(SERVER_PATH)" || (echo "SERVER_PATH not set" && exit 1)
	@test -n "$(SSH_HOST)" || (echo "SSH_HOST not set" && exit 1)
	@test -n "$(SSH_USER)" || (echo "SSH_USER not set" && exit 1)

	# Execute rollback script
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) 'bash -s' < scripts/rollback.sh $(SSH_USER) $(SERVER_PATH)

	@echo "Rollback completed"

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf .next
	rm -rf package
	rm -f *.tar.gz
	rm -rf node_modules/.cache
	@echo "Clean completed"

# Development helpers
dev-deploy: build-staging package
	@echo "Development deployment ready"

prod-deploy: build-production package verify-build
	@echo "Production deployment ready"