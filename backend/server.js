// Server.js
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
const fs = require('fs');
const path = require('path');
const cors = require("cors"); // Import cors
require("dotenv").config(); // Load environment variables from .env

const app = express();
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
// Basic message for the root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Fix: Use `app.get` instead of `router.get`
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});


// Enable CORS for requests from specific origins
app.use(
  cors({
    origin: ["http://localhost:5173", "https://heyyauto-ds4z.vercel.app/"],
  })
);

// Connect to MongoDB
connectDB();

app.use(express.json()); // Middleware to parse JSON

// Route mounting for auth-related routes
app.use("/", authRoutes);

const corsOptions = {
  origin: ['https://heyyautooo.onrender.com'], // allow requests from this origin
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));