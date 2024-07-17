import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'; // Import Link for navigation
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import './App.css'; // Add global CSS if needed

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Update isLoggedIn state upon successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update isLoggedIn state upon logout
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Employee Management System</h1>
          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </header>
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? '/employees' : '/login'} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/employees" element={isLoggedIn ? <EmployeeList /> : <Navigate to="/login" />} />
          {/* Add more routes for other components/pages as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
