const router = require("express").Router();
const Subject = require("../models/Subject");

// Add subject
router.post("/", async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get subjects by semester
router.get("/semester/:semester", async (req, res) => {
  try {
    const subjects = await Subject.find({ semester: req.params.semester });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
