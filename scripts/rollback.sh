#!/bin/bash
# scripts/rollback.sh - Server-side rollback script
# Usage: rollback.sh <user> <server_path>

set -euo pipefail

# Parameters
USER="${1:-quastromdeployer}"
SERVER_PATH="${2:-}"

# Validation
if [[ -z "$SERVER_PATH" ]]; then
    echo "Error: SERVER_PATH is required"
    echo "Usage: $0 <user> <server_path>"
    exit 1
fi

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting rollback process"
log "Server Path: $SERVER_PATH"

# Check if server path exists
if [[ ! -d "$SERVER_PATH" ]]; then
    log "ERROR: Server path does not exist: $SERVER_PATH"
    exit 1
fi

cd "$SERVER_PATH"

# Check if current deployment exists
CURRENT_LINK="$SERVER_PATH/current"
if [[ ! -L "$CURRENT_LINK" ]]; then
    log "ERROR: No current deployment found"
    exit 1
fi

CURRENT_RELEASE=$(readlink "$CURRENT_LINK")
log "Current release: $CURRENT_RELEASE"

# Check if previous deployment exists
PREVIOUS_LINK="$SERVER_PATH/previous"
if [[ ! -L "$PREVIOUS_LINK" ]]; then
    log "ERROR: No previous deployment found to rollback to"

    # Try to find the second most recent release
    log "Attempting to find previous release from releases directory"

    if [[ ! -d "$SERVER_PATH/releases" ]]; then
        log "ERROR: Releases directory not found"
        exit 1
    fi

    cd "$SERVER_PATH/releases"

    # Get the two most recent releases
    RECENT_RELEASES=($(ls -1t | head -n 2))

    if [[ ${#RECENT_RELEASES[@]} -lt 2 ]]; then
        log "ERROR: Less than 2 releases found, cannot rollback"
        ls -la
        exit 1
    fi

    # The second most recent should be our rollback target
    PREVIOUS_RELEASE="$SERVER_PATH/releases/${RECENT_RELEASES[1]}"

    if [[ ! -d "$PREVIOUS_RELEASE" ]]; then
        log "ERROR: Previous release directory not found: $PREVIOUS_RELEASE"
        exit 1
    fi

    log "Found previous release: $PREVIOUS_RELEASE"
else
    PREVIOUS_RELEASE=$(readlink "$PREVIOUS_LINK")
    log "Previous release: $PREVIOUS_RELEASE"

    # Verify the previous release directory exists
    if [[ ! -d "$PREVIOUS_RELEASE" ]]; then
        log "ERROR: Previous release directory does not exist: $PREVIOUS_RELEASE"
        exit 1
    fi
fi

# Confirm we're not trying to rollback to the same release
if [[ "$CURRENT_RELEASE" == "$PREVIOUS_RELEASE" ]]; then
    log "ERROR: Current and previous releases are the same"
    exit 1
fi

# Extract release names for logging
CURRENT_RELEASE_NAME=$(basename "$CURRENT_RELEASE")
PREVIOUS_RELEASE_NAME=$(basename "$PREVIOUS_RELEASE")

log "Rolling back from $CURRENT_RELEASE_NAME to $PREVIOUS_RELEASE_NAME"

# Get the application name from PM2 processes
PM2_APP_NAME=$(pm2 jlist | jq -r '.[].name' | grep -E "cabinetdab-(production|staging)" | head -n1 || echo "")

if [[ -z "$PM2_APP_NAME" ]]; then
    log "WARNING: Could not determine PM2 application name, will try to restart all processes"
fi

# Perform the rollback
log "Switching current symlink to previous release"

# Create a backup of the current state
BACKUP_LINK="$SERVER_PATH/backup-$(date +%s)"
cp -P "$CURRENT_LINK" "$BACKUP_LINK"

# Atomically switch to the previous release
ln -sfn "$PREVIOUS_RELEASE" "$CURRENT_LINK"
chown -h $USER:www-data "$CURRENT_LINK"

log "Symlink updated successfully"

# Update the previous link to point to what was current
ln -sfn "$CURRENT_RELEASE" "$PREVIOUS_LINK"

# Restart PM2 processes
log "Restarting PM2 processes"

cd "$SERVER_PATH"

if [[ -n "$PM2_APP_NAME" ]]; then
    log "Reloading PM2 application: $PM2_APP_NAME"
    if pm2 reload "$PM2_APP_NAME"; then
        log "PM2 application reloaded successfully"
    else
        log "ERROR: Failed to reload PM2 application"
        # Try to start it if reload failed
        log "Attempting to start PM2 application"
        pm2 start ecosystem.config.js
    fi
else
    log "Restarting all PM2 processes"
    if pm2 restart all; then
        log "All PM2 processes restarted successfully"
    else
        log "ERROR: Failed to restart PM2 processes"
        exit 1
    fi
fi

# Save PM2 configuration
pm2 save

# Wait for application to start
log "Waiting for application to start..."
sleep 10

# Verify the rollback
log "Verifying rollback..."

# Check symlink
CURRENT_AFTER_ROLLBACK=$(readlink "$CURRENT_LINK")
if [[ "$CURRENT_AFTER_ROLLBACK" == "$PREVIOUS_RELEASE" ]]; then
    log "✅ Symlink verification passed"
else
    log "❌ Symlink verification failed"
    log "Expected: $PREVIOUS_RELEASE"
    log "Actual: $CURRENT_AFTER_ROLLBACK"
    exit 1
fi

# Check PM2 status
if [[ -n "$PM2_APP_NAME" ]]; then
    if pm2 status | grep -q "$PM2_APP_NAME.*online"; then
        log "✅ PM2 application is running"
    else
        log "❌ PM2 application is not running properly"
        pm2 status
        exit 1
    fi
else
    # Check if any PM2 processes are running
    ONLINE_PROCESSES=$(pm2 jlist | jq -r '.[] | select(.pm2_env.status == "online") | .name' | wc -l)
    if [[ $ONLINE_PROCESSES -gt 0 ]]; then
        log "✅ PM2 processes are running ($ONLINE_PROCESSES online)"
    else
        log "❌ No PM2 processes are running"
        pm2 status
        exit 1
    fi
fi

# Optional: Basic HTTP health check if curl is available
if command -v curl >/dev/null 2>&1; then
    log "Performing basic health check..."

    # Try to determine the port from ecosystem config
    PORT="3000"  # default
    if [[ -f "ecosystem.config.js" ]]; then
        # Try to extract port from ecosystem config (basic attempt)
        EXTRACTED_PORT=$(grep -o "PORT.*[0-9]\+" ecosystem.config.js | grep -o "[0-9]\+" | head -n1 || echo "")
        if [[ -n "$EXTRACTED_PORT" ]]; then
            PORT="$EXTRACTED_PORT"
        fi
    fi

    if curl -f -s "http://localhost:$PORT" >/dev/null; then
        log "✅ Health check passed"
    else
        log "⚠️  Health check failed (this might be expected if no health endpoint exists)"
    fi
fi

# Clean up backup link after successful rollback
if [[ -L "$BACKUP_LINK" ]]; then
    rm -f "$BACKUP_LINK"
fi

log "🎉 Rollback completed successfully!"
log "Rolled back from: $CURRENT_RELEASE_NAME"
log "Rolled back to: $PREVIOUS_RELEASE_NAME"
log ""
log "Current application status:"
pm2 status

exit 0