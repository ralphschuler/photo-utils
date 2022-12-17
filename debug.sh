#!/bin/bash

echo "Creating docker image"
docker buildx build --no-cache -t test .

echo "Running docker image"
docker run -v "/Users/ralphschuler/Google Drive/My Drive/01_Photos & Videos:/photos:ro" -v "$(PWD)/debug_data:/data:rw" test debug scan /photos
