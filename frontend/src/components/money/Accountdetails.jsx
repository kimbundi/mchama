import React, { useEffect, useState } from 'react';
import './Accountdetails.css';

const AccountDetails = () => {
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setAccountData(JSON.parse(storedData));
    }
  }, []);

  if (!accountData) {
    return <p>No account details saved.</p>;
  }

  return (
    <div className="money-container">
      
      {accountData.provider && (
        <div className="details-section">
          <h3>Money Account</h3>
          <p><strong>Provider:</strong> {accountData.provider}</p>
          <p><strong>Account Name:</strong> {accountData.moneyAccountName}</p>
          <p><strong>Account Number:</strong> {accountData.moneyAccountNumber}</p>
          <p><strong>Initial Balance:</strong> {accountData.moneyInitialBalance}</p>
        </div>
      )}

      {accountData.groupAccountName && (
        <div className="details-section">
          <h3>Group Account</h3>
          <p><strong>Group Name:</strong> {accountData.groupAccountName}</p>
          <p><strong>Bank Name:</strong> {accountData.groupBankName}</p>
          <p><strong>Account Number:</strong> {accountData.groupAccountNumber}</p>
          <p><strong>Initial Balance:</strong> {accountData.groupInitialBalance}</p>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
