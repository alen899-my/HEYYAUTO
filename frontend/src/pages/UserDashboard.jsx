import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaHome,
  FaUser,
  FaCar,
  FaBook,
  FaCreditCard,
  FaHeadset,
  FaCog,
} from 'react-icons/fa';
import '../App.css';

import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          mode: 'cors', // Add this line
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [navigate]);
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleSearch(from, to); // Call the handleSearch function();
  // };
  // Fetch User Profile
  // Fetch User Profile
const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await axios.get('http://localhost:5000/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUserProfile(response.data);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching user profile:', err.response || err.message);
    setError(err.response?.data?.msg || 'Failed to load user profile');
    setLoading(false);
  }
};

  
  useEffect(() => {
    if (activeTab === 'profile') {
      fetchUserProfile();
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const fetchDrivers = async () => {
    console.log('Fetching drivers...');
    console.log('From:', from);
  console.log('To:', to);
  if (!from || !to) {
    console.error('Error: from and to locations are required');
    return;
  }
    try {
      const response = await fetch(`http://localhost:5000/api/drivers/${from}/${to}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDrivers();
  };


  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>User Dashboard</h2>
        <ul>
          <li
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => handleTabClick('home')}
          >
            <FaHome />
            <span>Home</span>
          </li>
          <li
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => handleTabClick('profile')}
          >
            <FaUser />
            <span>Profile</span>
          </li>
          <li
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => handleTabClick('bookings')}
          >
            <FaBook />
            <span>Bookings</span>
          </li>
          <li
            className={activeTab === 'paymentHistory' ? 'active' : ''}
            onClick={() => handleTabClick('paymentHistory')}
          >
            <FaCreditCard />
            <span>Payment History</span>
          </li>
          <li
            className={activeTab === 'support' ? 'active' : ''}
            onClick={() => handleTabClick('support')}
          >
            <FaHeadset />
            <span>Support</span>
          </li>
          <li
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => handleTabClick('settings')}
          >
            <FaCog />
            <span>Settings</span>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {/* Home Section */}
        {activeTab === 'home' && (
  <div className="dashboard-content">
    <div className="ride-section">
      <div className="ride-left">
        <h2>Find a Ride</h2>
        <form onSubmit={handleSubmit} className="ride-form">
          <div className="form-group">
            <label htmlFor="from">From:</label>
            <input
              type="text"
              id="from"
              placeholder="Enter starting point"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="to">To:</label>
            <input
              type="text"
              id="to"
              placeholder="Enter destination"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Search Drivers
          </button>
        </form>
      </div>

      <div className="ride-right">
        <h2>Available Drivers</h2>
        {drivers.length > 0 ? (
          <ul className="drivers-list">
            {drivers.map((driver) => (
              <li key={driver._id} className="driver-card">
                {driver.profileImage && (
                  <img
                    src={`http://localhost:5000/${driver.profileImage}`}
                    alt="Driver Profile"
                    className="driver-image"
                  />
                )}
                <p><strong>Name:</strong> {driver.name}</p>
                <p><strong>Vehicle Number:</strong> {driver.vehicleNumber}</p>
                <p><strong>License Number:</strong> {driver.licenseNumber}</p>
                <button className="driver-book">Book</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No drivers found at this location.</p>
        )}
      </div>
 

      </div>
          </div>


        )}

        {/* User Profile Section */}
        {activeTab === 'profile' && (
          <div className="profile-card">
            <h3>My Profile</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              userProfile && (
                <div className="profile-details">
                  
                 
                  <div className="profile-info">
                    <h4>{userProfile.fullName}</h4>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>Phone:</strong> {userProfile.phoneNumber}</p>
                   
                    <button className="edit-profile-btn">Edit Profile</button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
        {/* Bookings Section */}
        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h3>Your Bookings</h3>
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <strong>{booking.driver}</strong> - {booking.date} - {booking.status}
                  <button>View Details</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Payment History Section */}
        {activeTab === 'paymentHistory' && (
          <div className="payment-history-section">
            <h3>Payment History</h3>
            <ul>
              {paymentHistory.map((payment) => (
                <li key={payment.id}>
                  <strong>Amount:</strong> {payment.amount} - {payment.date} - {payment.method}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Support Section */}
        {activeTab === 'support' && (
          <div className="support-section">
            <h3>Need Help?</h3>
            <p>If you have any issues, please reach out to our support team.</p>
            <button>Contact Support</button>
          </div>
        )}

        {/* Settings Section */}
        {activeTab === 'settings' && (
          <div className="settings-section">
            <h3>Settings</h3>
            <ul>
              <li>Enable Notifications</li>
              <li>Privacy Settings</li>
              <li>Change Password</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;