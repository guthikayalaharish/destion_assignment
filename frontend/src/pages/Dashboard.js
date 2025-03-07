import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      {user ? (
        <p>Welcome, {user.storeName}!</p>
      ) : (
        <p>Please <Link to="/login">login</Link> to manage your store details.</p>
      )}
      <div>
        <Link to="/invoices">Go to Invoice Portal</Link><br />
        <Link to="/products">Go to Product Management</Link>
      </div>
    </div>
  );
};

export default Dashboard;
