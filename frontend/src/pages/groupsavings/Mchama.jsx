import { useState } from "react";
import "./Mchama.css";

const MchamaGroupSavings = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    memberName: "",
    phoneNumber: "",
    contributionAmount: "",
    contributionDate: "",
    totalSavings: 0,
    members: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMember = () => {
    if (formData.memberName && formData.phoneNumber) {
      setFormData((prev) => ({
        ...prev,
        members: [...prev.members, { name: prev.memberName, phone: prev.phoneNumber, savings: 0 }],
        memberName: "",
        phoneNumber: "",
      }));
    }
  };

  const handleContribution = (index) => {
    const amount = parseFloat(formData.contributionAmount);
    if (amount > 0) {
      const updatedMembers = [...formData.members];
      updatedMembers[index].savings += amount;
      setFormData((prev) => ({
        ...prev,
        members: updatedMembers,
        totalSavings: prev.totalSavings + amount,
        contributionAmount: "",
      }));
    }
  };

  return (
    <div className="container">
      <h2 className="title">Mchama Group Savings</h2>
      
      {/* Group Name */}
      <input
        type="text"
        name="groupName"
        placeholder="Group Name"
        value={formData.groupName}
        onChange={handleChange}
        className="input"
      />
      
      {/* Member Details */}
      <div className="grid">
        <input
          type="text"
          name="memberName"
          placeholder="Member Name"
          value={formData.memberName}
          onChange={handleChange}
          className="input"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="input"
        />
      </div>
      <button onClick={handleAddMember} className="btn">Add Member</button>

      {/* Members List */}
      <div className="members-list">
        <h3 className="subtitle">Members</h3>
        {formData.members.length === 0 ? (
          <p className="text-muted">No members added yet.</p>
        ) : (
          <ul className="list">
            {formData.members.map((member, index) => (
              <li key={index} className="list-item">
                <span>{member.name} ({member.phone}) - KES {member.savings.toFixed(2)}</span>
                <div className="contribution-section">
                  <input
                    type="number"
                    name="contributionAmount"
                    placeholder="Amount"
                    value={formData.contributionAmount}
                    onChange={handleChange}
                    className="input small"
                  />
                  <button
                    onClick={() => handleContribution(index)}
                    className="btn btn-green"
                  >
                    Contribute
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total Savings */}
      <div className="total-savings">
        <h3 className="total-title">Total Group Savings: KES {formData.totalSavings.toFixed(2)}</h3>
        
      </div>
      <div className="button-container">
      <button className="group">Track Group Savings </button>
      </div>
    </div>
  );
};

export default MchamaGroupSavings;
