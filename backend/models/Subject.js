const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  semester: String,
  maxMarks: Number,
});

module.exports = mongoose.model("Subject", subjectSchema);
