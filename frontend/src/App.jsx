import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import LoginPage from './pages/LoginPage';
import DriverSignup from './pages/DriverSignup';
import UserDashboard from './pages/UserDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/DriverSignup" element={<DriverSignup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </>
  );
};

export default App;
