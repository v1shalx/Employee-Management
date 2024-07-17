import React from 'react';
import EmployeeList from './components/EmployeeList';
import './App.css'; // Add global CSS if needed

const App = () => {
  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <EmployeeList />
    </div>
  );
};

export default App;
