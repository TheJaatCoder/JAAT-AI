#!/bin/bash

# JAAT-AI Launcher Script
# This script starts the JAAT-AI server directly

# Define paths
JAAT_PATH="./JAAT-AI"
SERVER_SCRIPT="$JAAT_PATH/server.js"

# Check if JAAT-AI directory exists
if [ ! -d "$JAAT_PATH" ]; then
  echo "Error: JAAT-AI directory not found at $JAAT_PATH"
  exit 1
fi

# Check if server.js exists
if [ ! -f "$SERVER_SCRIPT" ]; then
  echo "Error: server.js not found at $SERVER_SCRIPT"
  exit 1
fi

echo "Starting JAAT-AI server..."
cd "$JAAT_PATH" && node server.js