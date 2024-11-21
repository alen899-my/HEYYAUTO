import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); // Log response for debugging

      if (data.token) {
        localStorage.setItem("token", data.token);
      
        // Ensure user ID is stored
        if (data.user && data.user._id) {
          localStorage.setItem("userId", data.user._id);
          console.log("Stored userId:", data.user._id); // Debugging log
        } else {
          console.error("User ID is missing in response.");
        }
        // Navigate based on user role
        switch (data.role) {
          case "driver":
            navigate("/driver-dashboard");
            break;
          case "user":
            navigate("/user-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          default:
            alert("Invalid role.");
        }
      } else {
        alert(data.msg || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="switch-auth">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
