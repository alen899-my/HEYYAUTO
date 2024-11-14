import React, { useState } from 'react';
import {
  FaUser,
  FaClipboardList,
  FaCheckCircle,
  FaMoneyBillWave,
  FaComments,
} from 'react-icons/fa';
import '../App.css';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample booking data (you can replace this with API data)
  const newBookings = [
    { id: 1, user: 'John Doe', location: 'Central Park', time: '10:00 AM' },
    { id: 2, user: 'Jane Smith', location: 'Downtown', time: '11:30 AM' },
  ];

  const completedBookings = [
    { id: 1, user: 'Alice', location: 'Airport', time: '9:00 AM', fare: '₹200' },
    { id: 2, user: 'Bob', location: 'City Mall', time: '12:00 PM', fare: '₹150' },
  ];

  const totalEarnings = '₹3500';

  const feedbacks = [
    { id: 1, user: 'Alice', comment: 'Great service!', rating: 5 },
    { id: 2, user: 'Bob', comment: 'Very punctual.', rating: 4 },
  ];

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="driver-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Driver Dashboard</h2>
        <ul>
          <li
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => handleTabClick('profile')}
          >
            <FaUser />
            <span>Profile</span>
          </li>
          <li
            className={activeTab === 'newBookings' ? 'active' : ''}
            onClick={() => handleTabClick('newBookings')}
          >
            <FaClipboardList />
            <span>New Bookings</span>
          </li>
          <li
            className={activeTab === 'completedBookings' ? 'active' : ''}
            onClick={() => handleTabClick('completedBookings')}
          >
            <FaCheckCircle />
            <span>Completed Bookings</span>
          </li>
          <li
            className={activeTab === 'earnings' ? 'active' : ''}
            onClick={() => handleTabClick('earnings')}
          >
            <FaMoneyBillWave />
            <span>Earnings</span>
          </li>
          <li
            className={activeTab === 'feedback' ? 'active' : ''}
            onClick={() => handleTabClick('feedback')}
          >
            <FaComments />
            <span>Feedback</span>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {/* Profile Section */}
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h3>Profile Information</h3>
            {/* Replace this with driver profile details */}
            <p>Name: Rahul Kumar</p>
            <p>Phone: +91 9876543210</p>
            <p>Vehicle: Auto Rickshaw</p>
            <button>Edit Profile</button>
          </div>
        )}

        {/* New Bookings Section */}
        {activeTab === 'newBookings' && (
          <div className="new-bookings-section">
            <h3>New Bookings</h3>
            {newBookings.length > 0 ? (
              <ul>
                {newBookings.map((booking) => (
                  <li key={booking.id}>
                    <strong>{booking.user}</strong> - {booking.location} at {booking.time}
                    <button>Accept Booking</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new bookings available.</p>
            )}
          </div>
        )}

        {/* Completed Bookings Section */}
        {activeTab === 'completedBookings' && (
          <div className="completed-bookings-section">
            <h3>Completed Bookings</h3>
            <ul>
              {completedBookings.map((booking) => (
                <li key={booking.id}>
                  <strong>{booking.user}</strong> - {booking.location} at {booking.time} - Fare: {booking.fare}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Earnings Section */}
        {activeTab === 'earnings' && (
          <div className="earnings-section">
            <h3>Total Earnings</h3>
            <p>{totalEarnings}</p>
          </div>
        )}

        {/* Feedback Section */}
        {activeTab === 'feedback' && (
          <div className="feedback-section">
            <h3>Customer Feedback</h3>
            <ul>
              {feedbacks.map((feedback) => (
                <li key={feedback.id}>
                  <strong>{feedback.user}:</strong> {feedback.comment} - ⭐ {feedback.rating}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
