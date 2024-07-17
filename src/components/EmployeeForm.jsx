import React, { useState, useEffect } from 'react';
import './EmployeeForm.css'; // Adjust CSS import path as per your project structure
import api from '../services/api'; // Adjust API import path as per your project structure

const EmployeeForm = ({ onSubmit, editEmployee, onClose }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name);
      setMobile(editEmployee.mobile);
      setEmail(editEmployee.email);
      setPosition(editEmployee.position);
      setSalary(editEmployee.salary.toString()); // Ensure salary is set as a string for input compatibility
    }
  }, [editEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        name,
        mobile,
        email,
        position,
        salary: Number(salary), // Ensure salary is parsed as a number
      };

      if (editEmployee) {
        await api.update(editEmployee._id, employeeData);
        alert('Employee updated successfully');
      } else {
        await api.create(employeeData);
        alert('Employee added successfully');
      }
      onSubmit();
      setName('');
      setMobile('');
      setEmail('');
      setPosition('');
      setSalary('');
      setErrorMessage('');
      onClose();
    } catch (error) {
      setErrorMessage(error.message || 'Failed to save employee');
    }
  };

  return (
    <div className="employee-form">
      <h2>{editEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Mobile:</label>
        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />

        <label>Salary:</label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />

        <button type="submit">{editEmployee ? 'Update Employee' : 'Add Employee'}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
