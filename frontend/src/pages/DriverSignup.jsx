import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const DriverSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
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

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    formData.role = "driver";

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await axios.post("https://heyyautoo.onrender.com/register/driver-register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.msg);
      navigate("/login");
    } catch (error) {
      console.error("Driver Signup Error:", error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Driver Sign Up</h2>
        <form onSubmit={handleDriverSubmit} encType="multipart/form-data">
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} required />
          <input type="text" name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <input type="file" name="profileImage" onChange={handleImageChange} accept="image/*" required />
          <button type="submit">Sign Up as Driver</button>
        </form>
        <p className="switch-auth">Already have an account? <span onClick={() => navigate("/login")}>Login here</span></p>
      </div>
    </div>
  );
};

export default DriverSignup;