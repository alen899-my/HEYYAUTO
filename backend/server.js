const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors"); // Import cors
require('dotenv').config(); // Load environment variables from .env

const app = express();
app.get("/", (req, res) => {
    res.send("Welcome to the API!"); // Basic message for the root route
  });
  
// Enable CORS for requests from http://localhost:5173
app.use(cors({ origin: ["http://localhost:5173", "https://heyyauto-ds4z.vercel.app/"] }));


// Connect to MongoDB
connectDB();

app.use(express.json()); // Middleware to parse JSON

// Route mounting
app.use("/", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
