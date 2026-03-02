const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// GET /api/me (protected)
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-passwordHash");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user });
});

module.exports = router;