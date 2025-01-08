# Backend Documentation (Pallery)

## Overview
Express.js backend service handling authentication, image management, and database operations for Pallery.

## Tech Stack
- Express.js
- Node.js
- Supabase

## Project Structure
```
/server
├── src/
│   ├── controllers/   # Request handlers
│   ├── database/      # database manager
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── config/        # Configuration files
│   ├── images/        # uploaded images
│   └── libs/          # Helper functions
```

## Setup Instructions
1. Create `.env` file:
```bash
NODE_ENV=development
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-jwt-secret-key
```

2. Install dependencies:
```bash
npm install
```

3. Start server:
```bash
npm run dev
```
