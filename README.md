# QuickChat

Simple real-time chat app (React + Vite frontend, Express + MongoDB backend, Socket.IO).

## Features
- Real-time messaging with Socket.IO
- User signup / login (JWT)
- Profile update with image support (Cloudinary)
- Sidebar with users and unseen message counts
- Media (image) messages
- Responsive layout

## Tech stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, Mongoose (MongoDB)
- Real-time: Socket.IO
- Storage: Cloudinary (images)
- Dev tools: nodemon, react-hot-toast

## Prerequisites
- Node.js >= 16
- npm
- MongoDB Atlas (or local)
- Cloudinary account (optional for image upload)

## Environment variables

Server: `server/.env`
```
MONGODB_URI=<your-mongodb-uri>
PORT=5000
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

Client: `client/.env`
```
VITE_BACKEND_URL=http://localhost:5000
```
> Do NOT include surrounding quotes or extra spaces.

## Install & run (dev)

1. Clone
```
git clone <repo>
cd chatApp
```

2. Server
```
cd server
npm install
npm run start   # or: npx nodemon server.js
```

3. Client
```
cd ../client
npm install
npm run dev
```

Open frontend (Vite) URL printed in terminal (e.g. http://localhost:5173).

## Available scripts
- server: `npm start` (server.js)
- client: `npm run dev` (Vite)

## Project structure (short)
- server/
  - controllers/, models/, routes/, middleware/, lib/
  - server.js (app + socket.io)
- client/
  - src/components/, src/pages/, src/context/, src/assets/
  - main.jsx, App.jsx

## API (summary)
- Auth
  - POST /api/auth/signup — create account
  - POST /api/auth/login — login (returns token + user)
  - PUT /api/auth/update-profile — update profile (protected)
  - GET /api/auth/check — verify token
- Messages
  - GET /api/messages/users — sidebar users + unseen counts (protected)
  - GET /api/messages/:id — messages with user :id (protected)
  - POST /api/messages/send/:id — send message to user :id (protected)
  - PUT /api/messages/mark/:id — mark message(s) as seen (protected)
