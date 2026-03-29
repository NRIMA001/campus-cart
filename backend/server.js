const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

const User = require("./src/models/User");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("Campus Cart API is running ✅"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    createAdmin();
    app.listen(PORT, () => console.log(`!!Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("!!(X) DB connection failed:", err.message);
    process.exit(1);
  });

  async function createAdmin() {
    try {
      const admin = await User.findOne({ email: "admin" });
  
      if (!admin) {
        const hash = await bcrypt.hash("admin", 10);
  
        await User.create({
          fullName: "Administrator",
          email: "admin",
          university: "Campus Cart",
          passwordHash: hash,
          role: "admin"
        });
  
        console.log("✅ Admin user created (admin/admin)");
      }
    } catch (error) {
      console.error("Admin creation error:", error);
    }
  }
  
  
  
