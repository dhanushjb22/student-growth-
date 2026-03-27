const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || origin.includes("vercel.app") || origin.includes("localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/marks", require("./routes/marksRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));

app.get("/", (req,res)=>res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server Running on ${PORT}`));
