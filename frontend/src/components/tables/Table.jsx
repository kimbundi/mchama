import React, { useState } from 'react';
import './Table.css';

const Table = () => {
  const [rows, setRows] = useState([{ name: '', phone: '', email: '', role: '' }]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', phone: '', email: '', role: '' }]);
  };

  const handleDeleteRow = (index) => {
    if (rows.length === 1) {
      alert('At least one row must be present.');
      return;
    }
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };
  const handleSaveChanges = () => {
    const hasEmptyFields = rows.some(row => 
      !row.name.trim() || !row.phone.trim() || !row.email.trim() || !row.role.trim()
    );
  
    if (hasEmptyFields) {
      alert('Please fill out all fields before saving.');
      return;
    }
  
    localStorage.setItem('tableData', JSON.stringify(rows)); // Save to localStorage
    alert('Changes saved successfully!');
  };
  

  return (
    <div className="table-container">
      <h2 className="table-heading">Add Members</h2>
      <table className="member-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="table-input"
                  required
                />
              </td>
              <td>
                <input
                  type="tel"
                  maxLength='10'
                  placeholder="Enter Phone"
                  value={row.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  className="table-input"
                  required
                />
              </td>
              <td>
                <input
                  type="email"
                  placeholder="Enter Email"  
                  value={row.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  className="table-input"
                  required
                  
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Role"
                  value={row.role}
                  onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                  className="table-input"
                  required
                />
              </td>
              <td className="action-buttons">
                <button className="action-btn add" onClick={handleAddRow}>
                  Add
                </button>
                <button className="action-btn delete" onClick={() => handleDeleteRow(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="save-btn" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default Table;