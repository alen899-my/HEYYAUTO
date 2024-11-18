// authcontroler.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');



exports.registerUser = async (req, res) => {
  const { fullName, email, phoneNumber,Location, password, vehicleNumber, licenseNumber } = req.body;
  const profileImage = req.file ? `uploads/${req.file.filename}` : null;




  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      fullName, email, phoneNumber,Location, password: hashedPassword, 
      vehicleNumber, licenseNumber, profileImage,
      role: req.body.role || "user"  // Default role to "user"
    });
    console.log("New user profileImage path:", newUser.profileImage);
    await newUser.save();
    
    res.json({ msg: "Registration successful" });
  } catch (error) {
    res.status(500).json({ msg: "Error registering user" });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid user ID' });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ msg: "Error logging in" });
  }
};
