const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "driver", "admin"], default: "user" },
  vehicleNumber: { type: String },
  licenseNumber: { type: String },
  profileImage: { type: String },
});

module.exports = mongoose.model("User", userSchema);
