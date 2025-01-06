#!/bin/bash

# Navigate to the backend folder
cd server || exit

# Check if .env file exists
if [ -f ".env" ]; then
    echo ".env file already exists. Skipping configuration."
else
    echo ".env file not found. Creating a new .env file..."

    # Prompt for Supabase credentials
    read -p "Enter your SUPABASE_URL: " SUPABASE_URL
    read -p "Enter your SUPABASE_SERVICE_ROLE_KEY: " SUPABASE_SERVICE_ROLE_KEY
    read -p "Enter your JWT_SECRET (32+ characters): " JWT_SECRET

    # Write to .env file
    cat <<EOL > .env
NODE_ENV=development
SUPABASE_URL=$SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=$JWT_SECRET
EOL
    echo ".env file created for the backend."
fi

# Get the device's local IP address
DEVICE_IP=$(hostname -I | awk '{print $1}')

# Navigate to the frontend config file
cd ../app/src/config || exit

# Replace SERVER_URL in the config.ts file
CONFIG_FILE="config.ts"
sed -i.bak "s|SERVER_URL: .*|SERVER_URL: \"http://$DEVICE_IP:5000\",|g" $CONFIG_FILE

echo "Updated config.ts with the device's IP address: $DEVICE_IP."
