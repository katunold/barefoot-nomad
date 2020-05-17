#!/usr/bin/env bash

echo "Shutting down api infrastructures..."

# Stops all api infrastructures and removes container
docker-compose down
