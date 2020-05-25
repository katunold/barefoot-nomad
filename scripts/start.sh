#!/usr/bin/env bash

BUILD_CONTAINER="--build"

# Check if build is required
if [[ "$1" == "${BUILD_CONTAINER}" ]]; then
    echo "Building docker images..."
    docker-compose build
fi

echo "Starting backend containers..."
docker-compose up -d

