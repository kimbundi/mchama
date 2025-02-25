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
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="readonly-cell">{member.name}</td>
              <td className="readonly-cell">{member.phone}</td>
              <td className="readonly-cell">{member.email}</td>
              <td className="readonly-cell">{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberDetails;
