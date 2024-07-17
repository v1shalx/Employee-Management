import React, { useState, useEffect } from 'react';
import './EmployeeList.css'
import EmployeeItem from './EmployeeItem';
import EmployeeFilter from './EmployeeFilter';
import EmployeeForm from './EmployeeForm';
import api from '../services/api'; // Import API functions

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const [filter, setFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [filter]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedEmployees = await api.getAll(1, 10, '-createdAt', filter);
      // Reverse the order to display the latest added first
      const reversedEmployees = fetchedEmployees.reverse();
      setEmployees(reversedEmployees);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const handleAddOrUpdate = async () => {
    fetchEmployees(); // Refresh the list after adding/updating
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    await api.remove(id);
    fetchEmployees(); // Refresh the list after deleting
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setIsFormOpen(true);
  };

  const handleFilterChange = (value) => {
    setFilter(value); // Update filter state with the new filter value
  };

  const handleFormClose = () => {
    setEditEmployee(null);
    setIsFormOpen(false);
  };

  // Function to filter employees based on the current filter value
  const filteredEmployees = employees.filter((employee) => {
    // Check if any field (converted to lowercase string) contains the filter string
    const searchableFields = ['name', 'mobile', 'email', 'position', 'salary'];
    return searchableFields.some((field) => {
      if (field === 'salary') {
        // For salary, check if it matches the exact filter value
        return employee[field].toString().toLowerCase().includes(filter.toLowerCase());
      } else {
        // For other fields, check if they contain the filter string
        return employee[field].toString().toLowerCase().includes(filter.toLowerCase());
      }
    });
  });

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <EmployeeFilter onFilterChange={handleFilterChange} />
      <button onClick={() => setIsFormOpen(true)}>Add Employee</button>
      {isFormOpen && (
        <EmployeeForm
          onSubmit={handleAddOrUpdate}
          editEmployee={editEmployee}
          onClose={handleFormClose}
        />
      )}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.mobile}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td className="action-buttons">
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button onClick={() => window.confirm('Are you sure you want to delete this employee?') && handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
