import React, { useState, useEffect } from 'react';
import './EmployeeList.css';
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
  const [page, setPage] = useState(1); // Current page
  const limit = 5; // Items per page

  useEffect(() => {
    fetchEmployees();
  }, [filter, page]); // Update when filter or page changes

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedEmployees = await api.getAll(page, limit, 'createdAt', filter); // Fetch in ascending order
      setEmployees(fetchedEmployees);
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
    setPage(1); // Reset page to 1 when filter changes
  };

  const handleFormClose = () => {
    setEditEmployee(null);
    setIsFormOpen(false);
  };

  // Function to filter employees based on the current filter value
  const filteredEmployees = employees.filter((employee) => {
    // Check if any field (converted to lowercase string) contains the filter string
    const searchableFields = ['employeeId', 'name', 'mobile', 'email', 'position', 'salary'];
    return searchableFields.some((field) => {
      // Ensure employee[field] is not undefined before calling .toString()
      const value = employee[field];
      if (value === undefined || value === null) return false;
      return value.toString().toLowerCase().includes(filter.toLowerCase());
    });
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / limit);

  // Pagination controls
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Slice employees to display only the current page
  const displayedEmployees = filteredEmployees.slice((page - 1) * limit, page * limit);

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
      ) : filteredEmployees.length === 0 ? (
        <div>No employees found.</div>
      ) : (
        <React.Fragment>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedEmployees.map((employee) => (
                <EmployeeItem
                  key={employee._id}
                  employee={employee}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="pagination">
            <button disabled={page === 1} onClick={prevPage}>Previous</button>
            <span>{page}/{totalPages}</span>
            <button disabled={page === totalPages} onClick={nextPage}>Next</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default EmployeeList;
