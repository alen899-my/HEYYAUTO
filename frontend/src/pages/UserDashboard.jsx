import React, { useState } from 'react';
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

  // Sample data for drivers and bookings
  const drivers = [
    { id: 1, name: 'Ravi Kumar', location: 'Central Park', rating: 4.5 },
    { id: 2, name: 'Suresh Gupta', location: 'City Mall', rating: 4.0 },
  ];

  const bookings = [
    { id: 1, driver: 'Ravi Kumar', date: '14 Nov 2024', status: 'Completed' },
    { id: 2, driver: 'Suresh Gupta', date: '12 Nov 2024', status: 'Active' },
  ];

  const paymentHistory = [
    { id: 1, amount: '₹150', date: '10 Nov 2024', method: 'Credit Card' },
    { id: 2, amount: '₹200', date: '12 Nov 2024', method: 'UPI' },
  ];

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
            <h3>Select Location</h3>
            <input type="text" placeholder="Enter your location" />
            <button>Search</button>
            <h4>Available Drivers</h4>
            <ul>
              {drivers.map((driver) => (
                <li key={driver.id}>
                  <strong>{driver.name}</strong> - {driver.location} ⭐{driver.rating}
                  <button>Book Now</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Profile Section */}
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h3>Profile Information</h3>
            <p>Name: Alen Joseph</p>
            <p>Email: alen@example.com</p>
            <p>Phone: +91 9876543210</p>
            <button>Edit Profile</button>
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
