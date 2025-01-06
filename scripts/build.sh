#!/bin/bash

# Navigate to the frontend folder
cd app || exit

# Remove old build folder
echo "Removing old build folder..."
rm -rf dist

# Install dependencies and build the app
echo "Installing dependencies and building the app..."
npm install
npm run build

echo "---------------------------- Frontend build completed. ---------------------------- "
