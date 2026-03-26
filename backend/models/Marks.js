const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subject: String,
  semester: String,
  marks: Number,
  maxMarks: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model("Marks", marksSchema);
