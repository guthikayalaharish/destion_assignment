import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <Link to="/">Dashboard</Link>
      <Link to="/invoices" style={{ marginLeft: '10px' }}>Invoices</Link>
      <Link to="/products" style={{ marginLeft: '10px' }}>Products</Link>
      {user ? (
        <>
          <span style={{ marginLeft: '10px' }}>Welcome, {user.storeName}</span>
          <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{ marginLeft: '10px' }}>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
