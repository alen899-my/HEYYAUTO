import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users and drivers data
  const fetchData = async () => {
    try {
      const [userResponse, driverResponse] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/drivers')
      ]);

      if (!userResponse.ok || !driverResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const usersData = await userResponse.json();
      const driversData = await driverResponse.json();

      setUsers(usersData);
      setDrivers(driversData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.dispatchEvent(new Event('authChange'));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <button onClick={handleLogout}>Logout</button>
      {error && <p className="error-message">Error: {error}</p>}

      <div className="user-section">
        <h2>Registered Users</h2>
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
      </div>

      <div className="driver-section">
        <h2>Registered Drivers</h2>
        {drivers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>License Number</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map(driver => (
                <tr key={driver._id}>
                  <td>{driver._id}</td>
                  <td>{driver.fullName}</td>
                  <td>{driver.email}</td>
                  <td>{driver.licenseNumber || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No drivers found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
