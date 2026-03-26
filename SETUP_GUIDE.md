# Student Academic Growth Analyzer - Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

## Backend Setup

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create/Update `.env` file in backend folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-growth
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

For MongoDB Atlas, use:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/student-growth?retryWrites=true&w=majority
```

### 4. Start Backend Server
```bash
npm run dev
```
Server will run on http://localhost:5000

## Frontend Setup

### 1. Navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start Frontend
```bash
npm start
```
App will open on http://localhost:3000

## Project Structure

### Backend
- `config/` - Database configuration
- `controllers/` - Business logic
- `models/` - MongoDB schemas
- `routes/` - API endpoints
- `middleware/` - Auth & error handling

### Frontend
- `src/pages/` - Main pages
- `src/components/` - Reusable components
- `src/admincomp/` - Admin components
- `src/context/` - React context (Auth)
- `src/api/` - API configuration

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Students
- GET `/api/students` - Get all students
- POST `/api/students` - Add student
- GET `/api/students/:id` - Get student by ID
- PUT `/api/students/:id` - Update student
- DELETE `/api/students/:id` - Delete student

### Subjects
- GET `/api/subjects` - Get all subjects
- POST `/api/subjects` - Add subject

### Marks
- POST `/api/marks` - Add marks
- GET `/api/marks/student/:id` - Get student marks

### Attendance
- POST `/api/attendance` - Mark attendance
- GET `/api/attendance/student/:id` - Get student attendance

## Default Login Credentials

### Admin
- Email: admin@example.com
- Password: admin123
- Role: Admin

### Student
- Email: student@example.com
- Password: student123
- Role: Student

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- For local MongoDB: `mongod --dbpath <path>`

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Set PORT=3001 in frontend/.env

### CORS Issues
- Verify backend CORS is enabled
- Check API baseURL in `frontend/src/api/axios.js`

## Features
- Student & Admin dashboards
- Attendance tracking
- Marks entry & management
- Performance analytics
- Student reports
- Subject management
- Class performance overview

## Tech Stack
- **Frontend**: React, TailwindCSS, Recharts, Framer Motion
- **Backend**: Node.js, Express, MongoDB, JWT
- **State Management**: React Context API
