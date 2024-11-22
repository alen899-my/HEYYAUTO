import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();
  const [isDriverSignup, setIsDriverSignup] = useState(false); // Toggle between User and Driver signup forms
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    Location: "",
    vehicleNumber: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const role = isDriverSignup ? "driver" : "user";
    const formDataToSend = isDriverSignup
      ? new FormData()
      : { ...formData, role };

    if (isDriverSignup) {
      Object.entries({ ...formData, role }).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
    }

    try {
      const endpoint = isDriverSignup
        ? "http://localhost:5000/driver-register"
        : "http://localhost:5000/api/register";

      const headers = isDriverSignup
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

      const response = await axios.post(endpoint, formDataToSend, { headers });
      alert(response.data.msg);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isDriverSignup ? "flipped" : ""}`}>
        <div className="card-header">
          <h2
            className={!isDriverSignup ? "active" : ""}
            onClick={() => setIsDriverSignup(false)}
          >
            User Sign Up
          </h2>
          <h2
            className={isDriverSignup ? "active" : ""}
            onClick={() => setIsDriverSignup(true)}
          >
            Driver Sign Up
          </h2>
        </div>
        <form onSubmit={handleSubmit} encType={isDriverSignup ? "multipart/form-data" : "application/json"}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {isDriverSignup && (
            <>
              <input
                type="text"
                name="Location"
                placeholder="Main Location"
                value={formData.Location}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="vehicleNumber"
                placeholder="Vehicle Number"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="profileImage"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {isDriverSignup ? "Sign Up as Driver" : "Sign Up as User"}
          </button>
        </form>
        <p className="switch-auth">
          Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
