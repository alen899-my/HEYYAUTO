const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require('../models/User');
const path = require("path");
const { registerUser, loginUser } = require("../controllers/authController");

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

const upload = multer({ storage });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/driver-register", upload.single("profileImage"), (req, res) => {
  console.log(req.file); // log the uploaded file
  registerUser(req, res);
});

module.exports = router;