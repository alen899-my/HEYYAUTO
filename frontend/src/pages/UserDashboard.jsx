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


const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <div className="home-section">
            <h3>Welcome to the User Dashboard</h3>
            
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
