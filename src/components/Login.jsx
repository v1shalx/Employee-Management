import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password); // Assuming AuthService handles login logic
      onLogin(); // Notify parent component (App.jsx) of successful login
      navigate('/employees'); // Redirect to employees page upon successful login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-header">
          <h2>Login</h2>
        </div>
        <div className="form-body">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="emailInput">Email</label>
              <input
                id="emailInput"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                id="passwordInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
