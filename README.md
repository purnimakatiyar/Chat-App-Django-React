# Chat App Fullstack

A fullstack chat application built with Django (backend) and React (frontend).

## Project Structure

```
Chat-App-Fullstack/
├── backend/      # Django backend
├── frontend/     # React frontend
```

## Getting Started

### Backend

1. Build and run with Docker Compose:
   ```sh
   cd backend
   docker compose up --build
   ```

2. The backend runs on [http://localhost:8000](http://localhost:8000).

### Frontend

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```

2. Start the development server:
   ```sh
   npm start
   ```

3. The frontend runs on [http://localhost:5173](http://localhost:5173).

## Features

- Real-time chat using Django Channels
- WebSocket support
- User authentication

##