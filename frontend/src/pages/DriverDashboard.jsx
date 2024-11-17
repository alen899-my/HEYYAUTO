import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaUser,
  FaClipboardList,
  FaCheckCircle,
  FaMoneyBillWave,
  FaComments,
  FaClipboardCheck,
} from 'react-icons/fa';
import '../App.css';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [driverProfile, setDriverProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Approval request loading state

  const handleToggle = () => {
    setIsReady(!isReady);
  };

  // Fetch Driver Profile
  const fetchDriverProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://heyyautoo.onrender.comusers/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setDriverProfile(response.data);
      } else {
        setError('No profile details available');
      }
    } catch (err) {
      console.error('Failed to load driver profile:', err);
      setError('Failed to load driver profile');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Approval Status
  const fetchApprovalStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      setIsLoading(true);
      const response = await axios.get('https://heyyautoo.onrender.comapi/approval-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApprovalStatus(response.data.status || 'No request found.');
    } catch (err) {
      console.error('Error fetching approval status:', err.response?.data || err.message);
      setApprovalStatus('Could not fetch approval status.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Approval Request
  const handleApprovalRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      setIsLoading(true);
      const response = await axios.post(
        'https://heyyautoo.onrender.comapi/request-approval',
        {}, // Empty payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApprovalStatus(response.data.msg || 'Request sent successfully.');
    } catch (err) {
      const errorMessage = err.response?.data.msg || 'Failed to send approval request.';
      console.error('Error sending approval request:', errorMessage);
      setApprovalStatus(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchDriverProfile();
  }, []);

  // Fetch approval status whenever the approval request tab is active
  useEffect(() => {
    if (activeTab === 'approvalRequest') {
      fetchApprovalStatus();
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="driver-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Driver Dashboard</h2>
        <ul>
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}>
            <FaUser />
            <span>Profile</span>
          </li>
          <li className={activeTab === 'approvalRequest' ? 'active' : ''} onClick={() => handleTabClick('approvalRequest')}>
            <FaClipboardCheck />
            <span>Approval Request</span>
          </li>
          <li className={activeTab === 'newBookings' ? 'active' : ''} onClick={() => handleTabClick('newBookings')}>
            <FaClipboardList />
            <span>New Bookings</span>
          </li>
          <li className={activeTab === 'completedBookings' ? 'active' : ''} onClick={() => handleTabClick('completedBookings')}>
            <FaCheckCircle />
            <span>Completed Bookings</span>
          </li>
          <li className={activeTab === 'earnings' ? 'active' : ''} onClick={() => handleTabClick('earnings')}>
            <FaMoneyBillWave />
            <span>Earnings</span>
          </li>
          <li className={activeTab === 'feedback' ? 'active' : ''} onClick={() => handleTabClick('feedback')}>
            <FaComments />
            <span>Feedback</span>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {/* Profile Section */}
        {activeTab === 'profile' && (
          <div className="profile-card">
            <h3>My Profile</h3>
            {driverProfile ? (
              <div className="profile-details">
                {driverProfile.profileImage && (
                  <img src={`https://heyyautoo.onrender.com${driverProfile.profileImage}`} alt="Profile" className="profile-image" />
                )}
                <div className="profile-info">
                  <button className={`availability-btn ${isReady ? 'ready' : 'not-ready'}`} onClick={handleToggle}>
                    {isReady ? 'Available for Ride' : 'Not Available'}
                  </button>
                  <h4>{driverProfile.fullName}</h4>
                  <p><strong>Email:</strong> {driverProfile.email}</p>
                  <p><strong>Phone:</strong> {driverProfile.phoneNumber}</p>
                  <p><strong>Vehicle No:</strong> {driverProfile.vehicleNumber}</p>
                  <p><strong>License No:</strong> {driverProfile.licenseNumber}</p>
                  <button className="edit-profile-btn">Edit Profile</button>
                </div>
              </div>
            ) : (
              <p className="no-profile">No profile details available</p>
            )}
          </div>
        )}

      {/* Driver Approval Request Section */}
{activeTab === 'approvalRequest' && (
  <div className="approval-section">
    <h3>Driver Approval Request</h3>
    {approvalStatus === 'approved' ? (
      <p className="approval-success">🎉 Congratulations! You are approved as a driver.</p>
    ) : (
      <>
        <p>Request approval to be listed as an official driver on our platform.</p>
        <button
          className="request-approval-btn"
          onClick={handleApprovalRequest}
          disabled={isLoading || approvalStatus === 'pending'}
        >
          {isLoading ? 'Sending...' : approvalStatus === 'pending' ? 'Approval Pending' : 'Send Approval Request'}
        </button>
      </>
    )}
    {approvalStatus && <p className="approval-status">{approvalStatus}</p>}
  </div>
)}

      </div>
    </div>
  );
};

export default DriverDashboard;
