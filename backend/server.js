const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const User = require("./models/User");
const bookingsRoute = require('./routes/bookings');
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import cors
require("dotenv").config(); // Load environment variables from .env

const app = express();
const uploadsDir = path.join(__dirname, "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Enable CORS for specific frontend origins
app.use(
  cors({
    origin: ["http://localhost:5173", "https://heyyauto-ds4z.vercel.app"],
    credentials: true, // Allows cookies or authentication headers
  })
);

// Middleware to parse JSON
app.use(express.json());

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Welcome route for testing
app.get("/", (req, res) => {
  const responseData = { message: "Welcome to the API!" };
  res.json(responseData);
});

// Route to fetch all users (for testing purposes)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Connect to MongoDB
connectDB();

// Route mounting
app.use("/", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use('/api', bookingsRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));