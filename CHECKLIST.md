# ✅ Project Setup Checklist

## Before You Start

### 1. Install Prerequisites
- [ ] Node.js installed (check: `node --version`)
- [ ] MongoDB installed (check: `mongod --version`)
- [ ] npm installed (check: `npm --version`)

## Backend Setup

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```
- [ ] Dependencies installed successfully
- [ ] No error messages

### 3. Start MongoDB
```bash
mongod
```
OR if MongoDB is a service:
```bash
net start MongoDB
```
- [ ] MongoDB is running
- [ ] Listening on port 27017

### 4. Verify Backend Configuration
- [ ] `.env` file exists in backend folder
- [ ] MONGO_URI is correct
- [ ] PORT is set to 5000
- [ ] JWT_SECRET is configured

### 5. Start Backend Server
```bash
cd backend
npm run dev
```
Expected output:
```
Server Running on 5000
MongoDB Connected
```
- [ ] Server started successfully
- [ ] MongoDB connected
- [ ] No errors in console

## Frontend Setup

### 6. Install Frontend Dependencies
```bash
cd frontend
npm install
```
- [ ] Dependencies installed successfully
- [ ] No error messages

### 7. Start Frontend
```bash
cd frontend
npm start
```
- [ ] Frontend started successfully
- [ ] Browser opens at http://localhost:3000
- [ ] Login page displays correctly

## Testing the Application

### 8. Test Login Page
- [ ] Login page loads without errors
- [ ] Can switch between Student/Admin roles
- [ ] Form inputs are working

### 9. Test Navigation
- [ ] Can navigate to Register page
- [ ] Can login as Student
- [ ] Can login as Admin
- [ ] Dashboard loads after login

### 10. Test API Connection
Open browser console (F12) and check:
- [ ] No CORS errors
- [ ] API calls are reaching backend
- [ ] No 404 errors

## Common Issues & Solutions

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service
```bash
mongod
```

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in backend/.env to 5001

### Port 3000 Already in Use
**Solution**: Create frontend/.env with:
```
PORT=3001
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Reinstall dependencies
```bash
npm install
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Verify backend CORS is enabled in server.js

## Quick Start Command

### Windows Users
Double-click `start.bat` in the root folder

### Manual Start
**Terminal 1:**
```bash
cd backend && npm run dev
```

**Terminal 2:**
```bash
cd frontend && npm start
```

## Verification

### Backend Health Check
Visit: http://localhost:5000
Should display: "API Running"

### Frontend Health Check
Visit: http://localhost:3000
Should display: Login page

## Project Status

- [x] Backend server.js fixed (removed duplicates)
- [x] Frontend App.js updated (AuthProvider added)
- [x] Backend .env cleaned (removed duplicate MONGO_URI)
- [x] Setup documentation created
- [x] Quick start script created
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Application accessible

## Next Steps After Setup

1. Create admin user account
2. Add subjects
3. Add students
4. Enter marks and attendance
5. View analytics and reports

---

**Current Status**: Project files updated and ready for installation.
**Action Required**: Install dependencies and start servers.
