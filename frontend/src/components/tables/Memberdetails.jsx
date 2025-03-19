import React, { useEffect, useState } from 'react';
import './Memberdetails.css';

const MemberDetails = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('tableData');
    if (storedData) {
      setMembers(JSON.parse(storedData));
    }
  }, []);

  // Function to handle role change
  const handleRoleChange = (index, newRole) => {
    const updatedMembers = members.map((member, i) =>
      i === index ? { ...member, role: newRole } : member
    );

    setMembers(updatedMembers);
    localStorage.setItem('tableData', JSON.stringify(updatedMembers)); // Save changes to localStorage
  };

  if (members.length === 0) {
    return <p>No member data available.</p>;
  }

  return (
    <div className="table-container">
      <h2 className="table-heading">Member Details</h2>
      <table className="member-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="readonly-cell">{member.name}</td>
              <td className="readonly-cell">{member.phone}</td>
              <td>
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                >
                  <option value="Mwenyekiti">Mwenyekiti</option>
                  <option value="Member">Member</option>
                  <option value="Mweka Hazina">Mweka Hazina</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberDetails;
