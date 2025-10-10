#!/bin/bash
# scripts/deploy.sh - Server-side deployment script
# Usage: deploy.sh <user> <server_path> <revision> <environment> [keep_releases]

set -euo pipefail

# Parameters
USER="${1:-quastromdeployer}"
SERVER_PATH="${2:-}"
REVISION="${3:-}"
ENVIRONMENT="${4:-production}"
KEEP_RELEASES="${5:-3}"
PORT="${6:-3000}"

PM2_APP_NAME="cabinetdab-$ENVIRONMENT"

# Validation
if [[ -z "$SERVER_PATH" || -z "$REVISION" ]]; then
    echo "Error: SERVER_PATH and REVISION are required"
    echo "Usage: $0 <server_path> <revision> <environment> [keep_releases]"
    exit 1
fi

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Error handling
cleanup_on_error() {
    local exit_code=$?
    log "ERROR: Deployment failed with exit code $exit_code"

    # Remove failed release directory if it exists
    if [[ -d "$SERVER_PATH/releases/$REVISION" ]]; then
        log "Cleaning up failed release directory"
        rm -rf "$SERVER_PATH/releases/$REVISION"
    fi

    exit $exit_code
}

trap cleanup_on_error ERR

log "Starting deployment"
log "Server Path: $SERVER_PATH"
log "Revision: $REVISION"
log "Environment: $ENVIRONMENT"
log "Keep Releases: $KEEP_RELEASES"

# Check if release tarball exists
RELEASE_TARBALL="$SERVER_PATH/releases/$REVISION.tar.gz"
if [[ ! -f "$RELEASE_TARBALL" ]]; then
    log "ERROR: Release tarball not found: $RELEASE_TARBALL"
    exit 1
fi

# Extract release
log "Extracting release $REVISION"
RELEASE_DIR="$SERVER_PATH/releases/$REVISION"
mkdir -p "$RELEASE_DIR"

if ! tar -xzf "$RELEASE_TARBALL" -C "$RELEASE_DIR"; then
    log "ERROR: Failed to extract release tarball"
    exit 1
fi

# Verify extraction
if [[ ! -d "$RELEASE_DIR/standalone" ]]; then
    log "ERROR: Invalid release structure - standalone directory not found"
    exit 1
fi

# Set up shared directories and symlinks
log "Setting up shared resources"
mkdir -p "$SERVER_PATH/shared"/{logs,uploads,cache}

# Create symlinks for shared resources if they don't exist in the release
if [[ ! -d "$RELEASE_DIR/logs" ]]; then
    ln -sf "$SERVER_PATH/shared/logs" "$RELEASE_DIR/logs"
fi

if [[ ! -d "$RELEASE_DIR/uploads" ]] && [[ -d "$SERVER_PATH/shared/uploads" ]]; then
    ln -sf "$SERVER_PATH/shared/uploads" "$RELEASE_DIR/uploads"
fi

# Set permissions
log "Setting permissions"
chown -R $USER:www-data "$RELEASE_DIR"
find "$RELEASE_DIR" -type f -exec chmod 644 {} \;
find "$RELEASE_DIR" -type d -exec chmod 755 {} \;

# Make server.js executable if it exists
if [[ -f "$RELEASE_DIR/standalone/server.js" ]]; then
    chmod +x "$RELEASE_DIR/standalone/server.js"
fi

# Backup current deployment if it exists
CURRENT_LINK="$SERVER_PATH/current"
if [[ -L "$CURRENT_LINK" ]]; then
    PREVIOUS_RELEASE=$(readlink "$CURRENT_LINK")
    log "Previous release: $PREVIOUS_RELEASE"

    # Create a backup link
    if [[ -d "$PREVIOUS_RELEASE" ]]; then
        ln -sf "$PREVIOUS_RELEASE" "$SERVER_PATH/previous"
    fi
fi

# Atomic deployment - update the current symlink
log "Activating new release"
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"
chown -h $USER:www-data "$CURRENT_LINK"

# Update PM2 configuration
log "Updating PM2 configuration"
cd "$SERVER_PATH"

# Check if PM2 ecosystem file exists
if [[ -f "$RELEASE_DIR/ecosystem.config.js" ]]; then
    # Copy ecosystem config to current directory for PM2
    cp "$RELEASE_DIR/ecosystem.config.js" "$SERVER_PATH/"
elif [[ ! -f "$SERVER_PATH/ecosystem.config.js" ]]; then
    log "ERROR: PM2 ecosystem config not found"
    exit 1
fi

# Start or reload PM2
log "Managing PM2 process"
if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
    log "Reloading existing PM2 process with updated environment"
    NODE_ENV="$ENVIRONMENT" PORT="$PORT" pm2 reload "$PM2_APP_NAME" --update-env
else
    log "Starting new PM2 process"
    NODE_ENV="$ENVIRONMENT" PORT="$PORT" pm2 start ecosystem.config.js --name "$PM2_APP_NAME" --update-env
fi

# Save PM2 configuration
pm2 save

# Wait for application to start
log "Waiting for application to start..."
sleep 5

# Basic health check
if pm2 status | grep -q "$PM2_APP_NAME.*online"; then
    log "Application started successfully"
else
    log "WARNING: Application may not have started properly"
    pm2 status
fi

# Verify port
log "Verifying application is running on port $PORT"
if netstat -tulnp 2>/dev/null | grep -q ":$PORT"; then
    log "Port $PORT running: $(netstat -tulnp | grep ":$PORT")"
else
    log "ERROR: Application not running on port $PORT"
    exit 1
fi

# Clean up old releases
log "Cleaning up old releases (keeping $KEEP_RELEASES)"
cd "$SERVER_PATH/releases"

# Get list of release directories, sorted by modification time (newest first)
# Keep the specified number of releases plus the current one
RELEASE_DIRS=$(ls -1t | head -n $((KEEP_RELEASES + 1)) | tail -n +2)
ALL_DIRS=$(ls -1t)

for dir in $ALL_DIRS; do
    if [[ ! " $RELEASE_DIRS " =~ " $dir " ]] && [[ "$dir" != "$REVISION" ]]; then
        if [[ -d "$dir" ]]; then
            log "Removing old release: $dir"
            rm -rf "$dir"
        fi

        # Also remove the corresponding tarball
        if [[ -f "$dir.tar.gz" ]]; then
            rm -f "$dir.tar.gz"
        fi
    fi
done

# Remove the current release tarball (we don't need it anymore)
if [[ -f "$RELEASE_TARBALL" ]]; then
    rm -f "$RELEASE_TARBALL"
fi

log "Deployment completed successfully"
log "Current release: $REVISION"
log "Application status:"
pm2 status | grep "$PM2_APP_NAME" || true

# Final verification
if [[ -L "$CURRENT_LINK" ]] && [[ -d "$(readlink "$CURRENT_LINK")" ]]; then
    log "✅ Deployment verification passed"
    exit 0
else
    log "❌ Deployment verification failed"
    exit 1
fi