#!/bin/bash

# Navigate to the frontend folder
cd app/dist || exit

# Serve the built app on port 5173
echo "---------------------------- Starting the built frontend app on port 5173... ----------------------------"
npx serv