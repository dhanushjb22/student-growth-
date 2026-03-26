const router = require("express").Router();
const Student = require("../models/Student");
const Marks = require("../models/Marks");

// Add student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student by email
router.get("/email/:email", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student with marks
router.get("/:id/details", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const marks = await Marks.find({ studentId: req.params.id });
    res.json({ student, marks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
