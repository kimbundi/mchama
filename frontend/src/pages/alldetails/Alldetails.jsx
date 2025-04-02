import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/Storecontext';
import axios from 'axios';
import './Alldetails.css'; // Import CSS file

const ConfirmDetails = () => {
  const { url, token } = useContext(storeContext);
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/group/${groupId}/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setDetails({
            groupId: response.data.group._id,
            groupName: response.data.group.groupName,
            members: response.data.members,
            contributions: response.data.contributions,
            provider: response.data.bank.provider,
            accountName: response.data.bank.moneyAccountName,
            accountNumber: response.data.bank.moneyAccountNumber,
            initialBalance: response.data.bank.initialBalance,
          });
        } else {
          console.error("Failed to fetch details:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching details:", error.response?.data || error.message);
      }
    };

    fetchDetails();
  }, [groupId, url, token]);

  return (
    <div className="confirm-details-container">
      <h2 className="title">Confirm Your Details</h2>

      {details ? (
        <div className="details-box">
          {/* Group Details */}
          <div className="section">
            <h3 className="section-title"> Group Details</h3>
            <p><strong>Group ID:</strong> {details.groupId}</p>
            <p><strong>Group Name:</strong> {details.groupName}</p>
          </div>

          {/* Members */}
          <div className="section">
            <h3 className="section-title"> Members</h3>
            {details.members.length > 0 ? (
              <ul className="list">
                {details.members.map((member, index) => (
                  <li key={index} className="list-item">
                    <p><strong>Name:</strong> {member.name}</p>
                    <p><strong>Phone:</strong> {member.phone}</p>
                    <p><strong>Role:</strong> {member.role}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members available</p>
            )}
          </div>

          {/* Contributions */}
          <div className="section">
            <h3 className="section-title"> Contributions</h3>
            {details.contributions.length > 0 ? (
              <ul className="list">
                {details.contributions.map((contribution, index) => (
                  <li key={index} className="list-item">
                    <p><strong>Contribution Name:</strong> {contribution.contributionName}</p>
                    <p><strong>Frequency:</strong> {contribution.frequency}</p>
                    <p><strong>Member Contribution:</strong> {contribution.memberContribution}</p>
                    <p><strong>Start Date:</strong> {new Date(contribution.startDate).toDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No contributions available</p>
            )}
          </div>

          {/* Bank Details */}
          <div className="section">
            <h3 className="section-title"> Bank Details</h3>
            <p><strong>Provider:</strong> {details.provider || 'N/A'}</p>
            <p><strong>Account Name:</strong> {details.accountName || 'N/A'}</p>
            <p><strong>Account Number:</strong> {details.accountNumber || 'N/A'}</p>
            <p><strong>Initial Balance:</strong> {details.initialBalance}</p>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading details...</p>
      )}

      <button className="confirm-btn" onClick={() => navigate('/dashboard')}>
        Confirm & Proceed
      </button>
    </div>
  );
};

export default ConfirmDetails;
