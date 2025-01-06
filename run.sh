#!/bin/bash

# Run configuration script
echo "Running configuration script..."
bash scripts/config.sh

# Build the frontend
echo "Building the frontend..."
bash scripts/build.sh

# Run the backend
echo "Running the server..."
bash scripts/run_server.sh

# Start the frontend app
echo "Starting the frontend app..."
bash scripts/run_app.sh