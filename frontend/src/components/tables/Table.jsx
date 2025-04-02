import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Table.css';
import { storeContext } from '../../context/Storecontext';

const Table = () => {
  const { url, list, token } = useContext(storeContext);

  // Ensure the first group ID is assigned when available
  const [rows, setRows] = useState([
    { name: '', phone: '', groupId: list.length > 0 ? list[0] : '', role: '' }
  ]);

  // Updates row data when user types/selects an option
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Add a new row with default groupId if available
  const handleAddRow = () => {
    setRows([...rows, { name: '', phone: '', groupId: list.length > 0 ? list[0] : '', role: '' }]);
  };

  // Delete row but ensure at least one row remains
  const handleDeleteRow = (index) => {
    if (rows.length === 1) {
      alert('At least one row must be present.');
      return;
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  // Save changes by sending rows data to backend
  const handleSaveChanges = async (event) => {
    event.preventDefault();
    console.log("🚀 Form Data Being Sent to Backend:", rows); // Debugging
  
    // Ensure all fields are filled before submission
    const hasEmptyFields = rows.some(row => 
      !row.name.trim() || !row.phone.trim() || !row.role.trim() || !row.groupId.trim()
    );
  
    if (hasEmptyFields) {
      toast.error('⚠️ Please fill out all fields before saving.');
      return;
    }
  
    try {
      const payload = { rows };
      console.log("📦 Payload:", payload);

      const response = await axios.post(`${url}/api/member/add`, payload, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      console.log("✅ Response from Backend:", response.data);
  
      if (response.data.success) {
        toast.success("✅ Member has been added successfully!");
        setRows([{ name: '', phone: '', groupId: list.length > 0 ? list[0] : '', role: '' }]);
      } else {
        toast.error("❌ Member not added.");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error.response?.data || error.message);
      toast.error("⚠️ Kuna tatizo. Tafadhali jaribu tena.");
    }
  
    localStorage.setItem('tableData', JSON.stringify(rows));
    alert('Changes saved successfully!');
  };

  // Ensure groupId is assigned correctly when list updates
  useEffect(() => {
    if (list.length > 0) {
      setRows([{ name: '', phone: '', groupId: list[0], role: '' }]);
    }
  }, [list]);

  return (
    <div className="table-container">
      <h2 className="table-heading">Add Members</h2>
      <table className="member-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Group ID</th>
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
                  maxLength="10"
                  placeholder="Enter Phone"
                  value={row.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  className="table-input"
                  required
                />
              </td>
              <td>
                <select
                  value={row.groupId}
                  onChange={(e) => handleInputChange(index, 'groupId', e.target.value)}
                >
                  {list.length === 0 ? (
                    <option value="">Hakuna group zilizopatikana</option>
                  ) : (
                    list.map((id) => (
                      <option key={id} value={id}>
                        {id} {/* If you have group names, replace {id} with {groupName} */}
                      </option>
                    ))
                  )}
                </select>
              </td>
              <td>
                <select
                  value={row.role}
                  onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Mwenyekiti">Mwenyekiti</option>
                  <option value="Member">Member</option>
                  <option value="Mweka Hazina">Mweka Hazina</option>
                </select>
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
