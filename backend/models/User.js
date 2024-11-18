// user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },

    // Role can be user, driver, or admin
    role: { type: String, enum: ["user", "driver", "admin"], default: "driver" },

    // Driver-specific fields (only applicable if role is 'driver')
    vehicleNumber: {
      type: String,
      required: function () {
        return this.role === "driver";
      },
    },
    Location: {
      type: String,
      required: function () {
        return this.role === "driver";
      },
    },
    licenseNumber: {
      type: String,
      required: function () {
        return this.role === "driver";
      },
    },
    profileImage: { type: String, required: function () { return this.role === "driver"; } },

    // Driver approval status
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Address and location details (optional)
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },

    // For tracking user activity
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);