// authroutes
const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const User = require('../models/User');
const path = require("path");
const { registerUser, loginUser, deleteUser } = require("../controllers/authController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
// GET all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users/profile", authMiddleware(['driver']), async (req, res) => {
  try {
    // Fetch driver details using the user ID from the token
    const driver = await User.findById(req.user.id);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ msg: "Driver profile not found" });
    }
    res.json(driver);
  } catch (error) {
    console.error("Error fetching driver profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
});
router.delete('/users/:id', deleteUser);


// Delete a driver by ID (if using separate controller)

const upload = multer({ storage });

router.post("/api/register", registerUser);
router.post("/login", loginUser);
router.post("/driver-register", upload.single("profileImage"), (req, res) => {
  console.log(req.file); // log the uploaded file
  registerUser(req, res);
});

module.exports = router;