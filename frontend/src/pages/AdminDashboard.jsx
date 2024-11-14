import React, { useState, useEffect } from 'react'; 
import { FaUsers, FaUserTie, FaCheckCircle, FaListAlt } from 'react-icons/fa'; 
import axios from 'axios'; 
import '../App.css';

const AdminDashboard = () => { 
  const [activeTab, setActiveTab] = useState('userDetails'); 
  const [users, setUsers] = useState([]); 
  const [drivers, setDrivers] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Fetch users and drivers from the database
  useEffect(() => { 
    const fetchUsersAndDrivers = async () => { 
      setLoading(true); 
      try { 
        const response = await axios.get('http://localhost:5000/api/users'); // Adjust URL as per your server
        const allUsers = response.data; 
        setUsers(allUsers.filter(user => user.role === 'user')); 
        setDrivers(allUsers.filter(user => user.role === 'driver')); 
      } catch (err) { 
        setError(err.message); 
      } 
      setLoading(false); 
    }; 
    fetchUsersAndDrivers(); 
  }, []);

  // Handler to switch tabs
  const handleTabClick = (tab) => { 
    setActiveTab(tab); 
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li className={activeTab === 'userDetails' ? 'active' : ''} onClick={() => handleTabClick('userDetails')}>
            <FaUsers /> <span>User Details</span>
          </li>
          <li className={activeTab === 'driverDetails' ? 'active' : ''} onClick={() => handleTabClick('driverDetails')}>
            <FaUserTie /> <span>Driver Details</span>
          </li>
          <li className={activeTab === 'driverApproval' ? 'active' : ''} onClick={() => handleTabClick('driverApproval')}>
            <FaCheckCircle /> <span>Driver Approval</span>
          </li>
          <li className={activeTab === 'totalUsers' ? 'active' : ''} onClick={() => handleTabClick('totalUsers')}>
            <FaListAlt /> <span>Total Count</span>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {activeTab === 'userDetails' && (
          <div className="details-section">
            <h3>User Details</h3>
            {users.length > 0 ? (
              <div className="grid-container">
                {users.map((user) => (
                  <div className="card" key={user._id}>
                    <h4>{user.fullName}</h4>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phoneNumber}</p>
                    <p>Role: {user.role}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No users found</p>
            )}
          </div>
        )}

        {activeTab === 'driverDetails' && (
          <div className="details-section">
            <h3>Driver Details</h3>
            {drivers.length > 0 ? (
              <div className="grid-container">
                {drivers.map((driver) => (
                  <div className="card" key={driver._id}>
                    <h4>{driver.fullName}</h4>
                    <p>Email: {driver.email}</p>
                    <p>Phone: {driver.phoneNumber}</p>
                    <p>Vehicle: {driver.vehicleNumber || 'N/A'}</p>
                    <p>License: {driver.licenseNumber || 'N/A'}</p>
                    {driver.profileImage && (
                      <img
                        src={`http://localhost:5000/uploads/${driver.profileImage}`} // Adjust the URL path as per your server configuration
                        alt="Driver Profile"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No drivers found</p>
            )}
          </div>
        )}

        {activeTab === 'driverApproval' && (
          <div className="details-section">
            <h3>Driver Approval Requests</h3>
            <p>Driver approval requests section coming soon...</p>
          </div>
        )}

        {activeTab === 'totalUsers' && (
          <div className="details-section">
            <h3>Total Count</h3>
            <p>Total Users: {users.length}</p>
            <p>Total Drivers: {drivers.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
