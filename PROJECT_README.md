# Student Academic Growth Analyzer

A comprehensive full-stack web application for tracking and analyzing student academic performance with professional animations and modern UI.

## 🎨 Features

### Student Features (Cyan/Blue Theme)
- **Dashboard**: Academic growth analyzer with personalized suggestions
- **Subjects**: View all subjects with marks and performance indicators
- **Performance**: Multiple chart types (Bar, Line, Radar) for performance analysis
- **Attendance**: Track attendance with pie charts and semester-wise records
- **Profile**: Edit personal information and view student details
- **Animations**: Smooth transitions, floating gradient orbs, glassmorphism effects

### Admin Features (Orange/Purple Theme)
- **Students Management**: Add, edit, delete, and view student profiles
- **Subjects Management**: Create and manage subjects by semester
- **Marks Entry**: Bulk entry of marks for students
- **Attendance Recording**: Record and update student attendance
- **Student Reports**: Detailed individual student performance reports
- **Class Performance**: Overall class statistics and grade distribution
- **Analytics Dashboard**: Visual analytics with charts and statistics
- **Animations**: Professional sidebar animations, gradient themes, hover effects

### UI/UX Features
- **Dark Theme Login**: Animated login page with floating particles
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Gradient Animations**: Rotating gradient orbs in background
- **Smooth Transitions**: Framer Motion animations throughout
- **Responsive Design**: Works on all screen sizes
- **Color-Coded Themes**: Different colors for student (cyan/blue) and admin (orange/purple)

## 🚀 Tech Stack

### Frontend
- React.js
- Framer Motion (animations)
- Recharts (data visualization)
- Tailwind CSS (styling)
- Lucide React (icons)
- Axios (API calls)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studentDB
JWT_SECRET=your_jwt_secret_key_here
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start backend server:
```bash
npm start
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend development server:
```bash
npm start
```

Frontend will run on http://localhost:3000

## 🎯 Running the Project

### Method 1: Two Terminals

**Terminal 1 (Backend):**
```bash
cd "path/to/project/backend"
npm start
```

**Terminal 2 (Frontend):**
```bash
cd "path/to/project/frontend"
npm start
```

### Method 2: Windows (Automated)

Create a `start.bat` file in project root:
```batch
@echo off
start cmd /k "cd backend && npm start"
start cmd /k "cd frontend && npm start"
```

Run the batch file to start both servers.

## 👤 Default Login Credentials

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`
- Role: Admin

### Student Account
- First, admin must add student with email
- Then student can login with that email
- Password: any password (for demo)
- Role: Student

## 📝 Usage Guide

### For Admin:

1. **Login** as admin
2. **Add Students**: Go to Students → Add New Student
   - Enter name, roll number, email, department, semester
3. **Add Subjects**: Go to Subjects → Add subjects for each semester
4. **Enter Marks**: Go to Marks Entry → Select student and enter marks
5. **Record Attendance**: Go to Attendance → Select student and record percentage
6. **View Reports**: Check individual student reports or class performance
7. **Analytics**: View overall statistics and charts

### For Students:

1. **Login** with email provided by admin
2. **Dashboard**: View academic growth suggestions and performance analysis
3. **Subjects**: See all subjects with marks
4. **Performance**: Analyze performance with charts
5. **Attendance**: Track attendance records
6. **Profile**: Edit personal information

## 🎨 Color Themes

### Student Portal (Cyan/Blue)
- Primary: Cyan (#00e0ff) to Blue (#3b82f6)
- Sidebar: Blue gradient
- Accent: Purple, Pink
- Background: Light blue gradient

### Admin Portal (Orange/Purple)
- Primary: Orange (#f97316) to Amber (#f59e0b)
- Sidebar: Indigo gradient
- Accent: Purple, Pink
- Background: Dark gradient

## 📊 Database Schema

### Student
```javascript
{
  name: String,
  rollNumber: String,
  email: String (unique),
  department: String,
  semester: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Marks
```javascript
{
  studentId: ObjectId (ref: Student),
  subject: String,
  marks: Number,
  maxMarks: Number,
  semester: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance
```javascript
{
  studentId: ObjectId (ref: Student),
  semester: String,
  percentage: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Subject
```javascript
{
  name: String,
  code: String,
  semester: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify MongoDB service is started

### Frontend Not Loading
- Clear browser cache
- Check if backend is running
- Verify API endpoints in axios.js

### Student Data Not Showing
- Ensure admin has added student with exact email
- Check MongoDB for student record
- Verify email match between login and database

## 📁 Project Structure

```
student-academic-growth/
├── backend/
│   ├── models/
│   │   ├── Student.js
│   │   ├── Marks.js
│   │   ├── Attendance.js
│   │   └── Subject.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── marksRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── subjectRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   └── AdminSidebar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── DashboardHome.jsx
│   │   │   ├── StudentProfile.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminAnalytics.jsx
│   │   ├── admincomp/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   └── api/
│   │       └── axios.js
│   └── package.json
└── README.md
```

## 🌟 New Features Added

1. **Student Profile Page**: Edit personal information
2. **Admin Analytics Dashboard**: Visual statistics and charts
3. **Enhanced Animations**: Floating orbs, particles, smooth transitions
4. **Glassmorphism UI**: Modern semi-transparent design
5. **Color-Coded Themes**: Different colors for student and admin
6. **Gradient Backgrounds**: Animated gradient orbs
7. **Professional Sidebar**: Animated menu items with icons
8. **Dark Theme Login**: Modern dark login page

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Student Academic Growth Analyzer
© 2024 All Rights Reserved

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check console for errors

---

**Happy Coding! 🚀**
