const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

const User = require("../models/User");
const path = require("path");
const { registerUser, loginUser, deleteUser } = require("../controllers/authController");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Get all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get('/api/approval-status', authMiddleware(), async (req, res) => {
  try {
    const userId = req.user.id;

    // Correct query to find by ID
    const driver = await User.findById(userId);

    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ msg: 'Driver not found' });
    }

    res.status(200).json({ status: driver.approvalStatus });
  } catch (error) {
    console.error('Error fetching approval status:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Request approval for a driver
router.post('/api/request-approval', authMiddleware(['driver']), async (req, res) => {
  try {
    const driver = await User.findById(req.user.id);

    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ msg: "Driver not found or not authorized" });
    }

    if (driver.approvalStatus === 'pending') {
      return res.status(400).json({ msg: "Approval request already pending" });
    }

    driver.approvalStatus = 'pending';
    await driver.save();
    res.status(200).json({ msg: "Approval request sent successfully" });
  } catch (error) {
    console.error("Error handling approval request:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Approve or reject a driver (Admin only)
router.patch('/api/users/:id', authMiddleware(['admin']), async (req, res) => {
  const { id } = req.params;
  const { approvalStatus } = req.body; // Ensure `approvalStatus` is in the request payload

  if (!['approved', 'rejected'].includes(approvalStatus)) {
    return res.status(400).json({ msg: 'Invalid approval status' });
  }

  try {
    const driver = await User.findById(id);

    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ msg: 'Driver not found' });
    }

    driver.approvalStatus = approvalStatus;
    await driver.save();

    res.status(200).json({ msg: `Driver ${approvalStatus} successfully` });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get driver profile
router.get("/users/profile", authMiddleware(['driver']), async (req, res) => {
  try {
    const driver = await User.findById(req.user.id);

    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ msg: "Driver profile not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    console.error("Error fetching driver profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Register and login routes
router.post("/api/register", registerUser);
router.post("/login", loginUser);

// Driver registration with file upload
router.post("/driver-register", upload.single("profileImage"), (req, res) => {
  router.post('/driver-register', upload.single('profileImage'), registerUser);
  try {
    console.log(req.file); // Log the uploaded file

    // Construct the relative path to be stored in the database
    const profileImage = `uploads/${req.file.filename}`;

    // Attach profileImagePath to the request body
    req.body.profileImage = profileImage;

    // Call the registerUser function with updated request
    registerUser(req, res);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ msg: "Server error during registration" });
  }
});

// Delete a user by ID (Admin or self)
router.delete('/users/:id', authMiddleware(['admin']), deleteUser);

module.exports = router;
