import React, { useState } from 'react';
import { FaUsers, FaUserTie, FaCheckCircle, FaListAlt } from 'react-icons/fa';
import '../App.css';
import axios from 'axios';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Adjust URL as per your server
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  // Handler to switch tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>settings</h2>
        <ul>
          <li
            className={activeTab === 'userDetails' ? 'active' : ''}
            onClick={() => handleTabClick('userDetails')}
          >
            <FaUsers />
            <span>User Details</span>
          </li>
          <li
            className={activeTab === 'driverDetails' ? 'active' : ''}
            onClick={() => handleTabClick('driverDetails')}
          >
            <FaUserTie />
            <span>Driver Details</span>
          </li>
          <li
            className={activeTab === 'driverApproval' ? 'active' : ''}
            onClick={() => handleTabClick('driverApproval')}
          >
            <FaCheckCircle />
            <span>Driver Approval Requests</span>
          </li>
          <li
            className={activeTab === 'totalUsers' ? 'active' : ''}
            onClick={() => handleTabClick('totalUsers')}
          >
            <FaListAlt />
            <span>Total Users Count</span>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {activeTab === 'userDetails' && <div>User Details 
          
          </div>}
        {activeTab === 'driverDetails' && <div>Driver Details </div>}
        {activeTab === 'driverApproval' && <div>Driver Approval Requests </div>}
        {activeTab === 'totalUsers' && <div>Total Users Count </div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
