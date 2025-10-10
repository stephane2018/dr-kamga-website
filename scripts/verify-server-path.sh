#!/bin/bash
# scripts/verify-server-path.sh - Verify server path exists and has correct permissions
# Usage: verify-server-path.sh <user> <server_path>

set -euo pipefail

# Parameters
USER="${1:-}"
SERVER_PATH="${2:-}"

# Validation
if [[ -z "$USER" || -z "$SERVER_PATH" ]]; then
    echo "Error: USER and SERVER_PATH are required"
    echo "Usage: $0 <user> <server_path>"
    exit 1
fi

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Verifying server path: $SERVER_PATH"

# Check if SERVER_PATH exists, create if needed
if [[ ! -d "$SERVER_PATH" ]]; then
    log "Creating server path: $SERVER_PATH"
    if ! mkdir -p "$SERVER_PATH"; then
        log "ERROR: Failed to create server path: $SERVER_PATH"
        exit 1
    fi
fi

# Set ownership and permissions
log "Setting ownership and permissions for $SERVER_PATH"
if ! chown -R $USER:www-data "$SERVER_PATH" 2>/dev/null; then
    log "ERROR: Failed to set ownership"
    exit 1
fi

if ! chmod 755 "$SERVER_PATH" 2>/dev/null; then
    log "ERROR: Failed to set permissions"
    exit 1
fi

# Create releases directory
log "Creating releases directory"
if ! mkdir -p "$SERVER_PATH/releases"; then
    log "ERROR: Failed to create releases directory"
    exit 1
fi

# Create shared and logs directories
mkdir -p "$SERVER_PATH"/{shared,logs} 2>/dev/null || true

log "Server path verified successfully"
log "✅ $SERVER_PATH is ready for deployment"

exit 0
