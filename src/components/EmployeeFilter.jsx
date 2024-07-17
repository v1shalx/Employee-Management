import React, { useState } from 'react';
import './EmployeeFilter.css'; // Import CSS file for styling

const EmployeeFilter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value); // Call onFilterChange with the filter value
  };

  return (
    <div className="employee-filter">
      <label>Search Records:</label>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Enter name, email, or position"
      />
    </div>
  );
};

export default EmployeeFilter;
