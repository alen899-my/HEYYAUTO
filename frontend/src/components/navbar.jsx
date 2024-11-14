import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "../App.css";
import logo from "../images/logo.jpg";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to check login status based on localStorage token
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, set true, else false
  };

  // UseEffect to check the login status on component mount
  useEffect(() => {
    checkLoginStatus(); // Check login status when component mounts

    // Listen for changes to localStorage and force an update
    const storageListener = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", storageListener);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("storage", storageListener);
  }, []);
const storageListener = () => {
  console.log("Storage change detected, updating login status...");
  checkLoginStatus();
};
  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setIsLoggedIn(false); // Set login state to false
    navigate("/"); // Navigate to home after logout
    if (onLogout) onLogout();
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={scrollToTop}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Logo" className="logo-image" />
      </div>

      {/* Navigation Links */}
      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <NavLink to="/" className="nav-link" onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link" onClick={toggleMenu}>
          About Us
        </NavLink>
        <NavLink to="/contact" className="nav-link" onClick={toggleMenu}>
          Contact Us
        </NavLink>

        {isLoggedIn ? (
          <button
            className="nav-button"
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/signup" onClick={toggleMenu}>
              <button className="nav-button">Signup</button>
            </NavLink>
            <NavLink to="/login" onClick={toggleMenu}>
              <button className="nav-button">Login</button>
            </NavLink>
          </>
        )}
      </div>

      {/* Hamburger menu icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
