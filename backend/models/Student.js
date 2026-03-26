const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNumber: String,
  department: String,
  semester: String,
  profilePicture: String,
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
