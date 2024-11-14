import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      alert(response.data.msg);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>User Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <button type="submit">Sign Up as User</button>
        </form>
        <p className="switch-auth">
          Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
        </p>
        <div className="driver-signup-section">
          <p>Are you a driver?</p>
          <button className="driver-signup-button" onClick={() => navigate("/DriverSignup")}>Sign Up as Driver</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
