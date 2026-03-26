<<<<<<< HEAD
# 🎓 Student Academic Growth Analyzer

A comprehensive web application for tracking and analyzing student academic performance, attendance, and growth metrics.

## 🚀 Quick Start

### Option 1: Automated Start (Windows)
Double-click `start.bat` to launch both backend and frontend servers automatically.

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

## 📋 Prerequisites

- Node.js v14+ installed
- MongoDB installed and running
- Git (optional)

## 🔧 Configuration

### Backend (.env)
Located in `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studentDB
JWT_SECRET=supersecret
NODE_ENV=development
```

### Frontend
API endpoint configured in `frontend/src/api/axios.js`:
```javascript
baseURL: "http://localhost:5000/api"
```

## 📱 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 👥 User Roles

### Admin Features
- Manage students
- Add/update subjects
- Enter marks
- Track attendance
- View class performance
- Generate reports

### Student Features
- View personal dashboard
- Check marks
- View attendance
- Track academic progress
- Performance analytics

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- TailwindCSS
- Recharts (Analytics)
- Framer Motion (Animations)
- Axios
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## 📁 Project Structure

```
student-academic-growth/
├── backend/
│   ├── config/          # Database config
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & error handling
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── pages/       # Main pages
│       ├── components/  # Reusable components
│       ├── admincomp/   # Admin components
│       ├── context/     # React Context
│       └── api/         # API config
├── SETUP_GUIDE.md       # Detailed setup
└── start.bat            # Quick start script
```

## 📖 Documentation

For detailed setup instructions, API documentation, and troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 🐛 Troubleshooting

**MongoDB not connecting?**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**Port already in use?**
- Change PORT in backend `.env`
- For frontend, create `.env` with `PORT=3001`

**Dependencies issues?**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

ISC

## 👨‍💻 Author

Dhanush Jolly

---

**Need Help?** Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.
"# student-academic-growth-analyzer" 
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> 602780091340e75d16217bcf2d96d4e1e5b5c2d1
