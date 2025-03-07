// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // For demonstration, accept any non-empty username and password
    if (username.trim() && password.trim()) {
      login(username);
      navigate('/');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Store Login</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '5px', width: '200px', marginBottom: '10px' }}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '5px', width: '200px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '5px 10px' }}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
