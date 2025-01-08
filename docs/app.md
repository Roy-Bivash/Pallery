# Frontend Documentation (Pallery)

## Overview
Pallery is a Pinterest-style image hosting application built with React TypeScript and shadcn/ui. Users can upload, view, and manage their images after authentication.

## Tech Stack
- React TypeScript
- shadcn/ui
- Vite

## Project Structure
```
/app
├── src/
│   ├── @types/       # TypeScript type definitions
│   ├── assets/       # Images/icons
│   ├── components/   # Reusable UI components
│   ├── pages/        # Route components
│   ├── config/       # Configuration files
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript type definitions
│   ├── css/          # general css files
│   ├── router/       # React router
│   └── libs/         # Helper functions
```

## Setup Instructions
1. Install dependencies:
```bash
npm install
```

2. Configure the application:
- Update `src/config/config.ts` with your backend URL
```typescript
export const config = {
  SERVER_URL: "http://localhost:5000"
}
```

3. Start development server:
```bash
npm run dev
```

## Key Features
- User authentication (login/register)
- Image upload functionality
- Pinterest-style image grid layout
- Responsive design
- Protected routes for authenticated users

## API Integration
The frontend communicates with the Express backend through RESTful endpoints:
- POST `/auth/login` - User authentication
- POST `/auth/register` - User registration
- POST `/images/upload` - Image upload
- GET `/images` - Fetch user images

## Dependencies
- React Router for navigation
- Axios for API calls
- shadcn/ui for UI components