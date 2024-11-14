const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { registerUser, loginUser } = require("../controllers/authController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/driver-register", upload.single("profileImage"), registerUser);

module.exports = router;
