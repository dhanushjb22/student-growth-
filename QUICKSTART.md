# 🚀 QUICK START - Student Academic Growth Analyzer

## ⚡ Fastest Way to Run

### Method 1: Automated (Windows)
```bash
# Double-click this file:
start.bat
```

### Method 2: One Command (After installing concurrently)
```bash
# In root folder:
npm install
npm run install-all
npm start
```

### Method 3: Manual (Most Reliable)
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install
npm start
```

## 📍 Access Points

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api

## ✅ What Was Fixed

1. ✅ **Backend server.js** - Removed duplicate route registrations
2. ✅ **Backend .env** - Removed duplicate MONGO_URI
3. ✅ **Frontend App.js** - Added AuthProvider wrapper
4. ✅ **Documentation** - Created comprehensive guides

## 📦 Files Created

- `README.md` - Main project documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- `CHECKLIST.md` - Step-by-step verification
- `start.bat` - Windows quick start script
- `package.json` (root) - Unified scripts
- `.env.example` (backend) - Environment template
- `.env.example` (frontend) - Frontend config template

## 🔧 Current Configuration

### Backend
- Port: 5000
- Database: MongoDB (localhost:27017/studentDB)
- JWT Secret: supersecret

### Frontend
- Port: 3000
- API URL: http://localhost:5000/api

## ⚠️ Prerequisites

Before running, ensure:
1. ✅ Node.js installed
2. ✅ MongoDB installed and running
3. ✅ Ports 3000 and 5000 are available

## 🎯 First Time Setup

```bash
# 1. Start MongoDB
mongod

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Start backend (Terminal 1)
cd backend
npm run dev

# 5. Start frontend (Terminal 2)
cd frontend
npm start
```

## 🐛 Quick Troubleshooting

**MongoDB not connecting?**
```bash
mongod
```

**Port already in use?**
- Backend: Change PORT in `backend/.env`
- Frontend: Create `frontend/.env` with `PORT=3001`

**Dependencies error?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- **Quick Start**: This file
- **Detailed Setup**: SETUP_GUIDE.md
- **Checklist**: CHECKLIST.md
- **Frontend Guide**: frontend/README.md

## 🎓 Features

- Student & Admin dashboards
- Attendance tracking
- Marks management
- Performance analytics
- Student reports
- Subject management

## 📞 Support

Check CHECKLIST.md for common issues and solutions.

---

**Status**: ✅ Project Updated & Ready to Run
**Next Step**: Install dependencies and start servers
