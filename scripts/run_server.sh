#!/bin/bash

# Navigate to the backend folder
cd server || exit

# Install dependencies and run the server
echo "---------------------------- Starting the backend server on port 5000... ----------------------------"
npm install
npm run dev
