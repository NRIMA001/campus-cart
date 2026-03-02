const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// simple student email rule (.edu). You can customize later.
function isStudentEmail(email) {
  return email.toLowerCase().endsWith(".edu");
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, university, password } = req.body;

    if (!fullName || !email || !university || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isStudentEmail(email)) {
      return res.status(400).json({ message: "Use a valid student email (.edu)" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      university,
      passwordHash
    });

    return res.status(201).json({
      message: "Account created",
      user: { id: user._id, fullName: user.fullName, email: user.email, university: user.university }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      message: "Login successful",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, university: user.university }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;