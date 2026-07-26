# Job Board Platform

A modern full-stack job board application for posting, browsing, applying to, updating, and deleting job listings. The app includes a polished React frontend, a secure Express backend, and a simple CI workflow for automated validation.

## Overview

This project allows employers to post job openings and candidates to browse opportunities and apply for roles. It combines a premium-looking frontend experience with authentication-protected actions such as applying, creating, updating, and deleting jobs.

## Features

- User registration and login
- JWT-based authentication
- Browse and search job listings
- View detailed job information
- Apply for jobs only when authenticated
- Create, edit, and delete jobs from a dashboard
- Modern premium UI with popup confirmations
- CI workflow for client and server checks

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma ORM
- JWT authentication
- CORS

### DevOps
- GitHub Actions
- npm

## Project Structure

```text
job-board/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.jsx
│   └── package.json
├── server/                # Express backend
│   ├── prisma/            # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
└── .github/workflows/ci.yml
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd job-board
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Start the applications

Frontend:

```bash
cd client
npm run dev
```

Backend:

```bash
cd server
npm run dev
```

The frontend will run on the Vite dev server, and the backend will run on port 5000 by default.

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET=your_secret_key
```

If you are using Prisma, make sure your database is configured and migrations are applied.

```bash
cd server
npx prisma migrate dev
```

## API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Log in and receive a JWT

### Jobs
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get a specific job
- `POST /jobs` - Create a new job (protected)
- `PUT /jobs/:id` - Update a job (protected)
- `DELETE /jobs/:id` - Delete a job (protected)

### Applications
- `POST /applications/:id/apply` - Apply for a job (protected)

### Profile
- `GET /profile` - Get authenticated user profile (protected)

## CI/CD Workflow

A GitHub Actions workflow is available at [.github/workflows/ci.yml](.github/workflows/ci.yml).

It currently checks:
- client dependency installation and build
- server dependency installation
- a basic server startup validation step

## Live Demo

https://job-board-1-alp5.onrender.com/

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
