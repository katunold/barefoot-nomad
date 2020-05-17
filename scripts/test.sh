#!/usr/bin/env bash

# Runs test within docker
echo "Starting test..."
docker container exec -it barefoot-nomad-api bash -c "NODE_ENV=test nyc mocha --require @babel/register --exit"
