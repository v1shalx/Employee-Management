import React from 'react';
import './EmployeeItem.css'; // Adjust CSS import path as per your project structure

const EmployeeItem = ({ employee, onDelete, onEdit }) => {
  const { _id, name, mobile, email, position, salary } = employee;

  return (
    <tr className="employee-item">
      <td>{name}</td>
      <td>{mobile}</td>
      <td>{email}</td>
      <td>{position}</td>
      <td>{salary}</td>
      <td className="action-buttons">
        <button onClick={() => onEdit(employee)}>Edit</button>
        <button onClick={() => window.confirm('Are you sure you wish to delete this item?') && onDelete(_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default EmployeeItem;