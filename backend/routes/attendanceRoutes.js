const router = require("express").Router();
const Attendance = require("../models/Attendance");

// Save attendance
router.post("/", async (req, res) => {
  try {
    const { studentId, semester, percentage } = req.body;
    
    // Update or create
    const existing = await Attendance.findOne({ studentId, semester });
    if (existing) {
      existing.percentage = percentage;
      await existing.save();
      res.json(existing);
    } else {
      const data = await Attendance.create(req.body);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance by student
router.get("/student/:studentId", async (req, res) => {
  try {
    const data = await Attendance.find({ studentId: req.params.studentId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
