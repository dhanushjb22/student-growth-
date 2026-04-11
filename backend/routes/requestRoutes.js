const router = require("express").Router();
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: { type: String, default: "pending" },
  requestedAt: { type: Date, default: Date.now },
  resolvedAt: Date
});

const Request = mongoose.models.Request || mongoose.model("Request", requestSchema);

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({ requestedAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add request
router.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const existing = await Request.findOne({ email, status: "pending" });
    if (existing) return res.status(400).json({ error: "Request already pending" });
    const request = await Request.create({ email, name });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update request status
router.put("/:id", async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, resolvedAt: new Date() },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete request
router.delete("/:id", async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
