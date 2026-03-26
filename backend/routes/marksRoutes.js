const router = require("express").Router();
const Marks = require("../models/Marks");

// Save single mark
router.post("/", async (req, res) => {
  try {
    const data = await Marks.create(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save multiple marks
router.post("/bulk", async (req, res) => {
  try {
    const { studentId, semester, marks } = req.body;
    
    // Delete existing marks for this student and semester
    await Marks.deleteMany({ studentId, semester });
    
    // Create new marks
    const marksData = marks.map(m => ({
      studentId,
      semester,
      subject: m.subject,
      marks: m.marks,
      maxMarks: m.maxMarks || 100
    }));
    
    const saved = await Marks.insertMany(marksData);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get marks by student
router.get("/student/:studentId", async (req, res) => {
  try {
    const marks = await Marks.find({ studentId: req.params.studentId });
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
