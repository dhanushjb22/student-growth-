const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("./models/Student");
const Subject = require("./models/Subject");
const Marks = require("./models/Marks");
const Attendance = require("./models/Attendance");

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

async function addStudentData() {
  try {
    // Add student
    const student = await Student.create({
      name: "Dhanush Jolly",
      email: "dhanushjb22@gmail.com",
      rollNumber: "CS2022001",
      department: "Computer Science",
      semester: "Semester 5"
    });
    console.log("✅ Student added:", student.name);

    // Add subjects
    const subjects = await Subject.insertMany([
      { name: "Data Structures", semester: "Semester 5", maxMarks: 100 },
      { name: "Database Management", semester: "Semester 5", maxMarks: 100 },
      { name: "Web Development", semester: "Semester 5", maxMarks: 100 },
      { name: "Operating Systems", semester: "Semester 5", maxMarks: 100 },
      { name: "Computer Networks", semester: "Semester 5", maxMarks: 100 }
    ]);
    console.log("✅ Subjects added:", subjects.length);

    // Add marks
    const marksData = [
      { studentId: student._id, subject: "Data Structures", marks: 85, maxMarks: 100, semester: "Semester 5" },
      { studentId: student._id, subject: "Database Management", marks: 78, maxMarks: 100, semester: "Semester 5" },
      { studentId: student._id, subject: "Web Development", marks: 92, maxMarks: 100, semester: "Semester 5" },
      { studentId: student._id, subject: "Operating Systems", marks: 88, maxMarks: 100, semester: "Semester 5" },
      { studentId: student._id, subject: "Computer Networks", marks: 75, maxMarks: 100, semester: "Semester 5" }
    ];
    await Marks.insertMany(marksData);
    console.log("✅ Marks added for all subjects");

    // Add attendance
    const attendanceData = [
      { studentId: student._id, subject: "Data Structures", percentage: 90, semester: "Semester 5" },
      { studentId: student._id, subject: "Database Management", percentage: 85, semester: "Semester 5" },
      { studentId: student._id, subject: "Web Development", percentage: 95, semester: "Semester 5" },
      { studentId: student._id, subject: "Operating Systems", percentage: 88, semester: "Semester 5" },
      { studentId: student._id, subject: "Computer Networks", percentage: 82, semester: "Semester 5" }
    ];
    await Attendance.insertMany(attendanceData);
    console.log("✅ Attendance added for all subjects");

    console.log("\n🎉 All data added successfully!");
    console.log("📧 Student Email:", student.email);
    console.log("🔢 Student ID:", student._id);
    console.log("\n✨ Now refresh your student dashboard to see the data!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

addStudentData();
