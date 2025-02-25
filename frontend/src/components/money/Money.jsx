import React, { useState } from 'react';
import './Money.css';

const Money = () => {
  const [activeAccount, setActiveAccount] = useState('money'); // Active form selection
  const [formData, setFormData] = useState({
    provider: '',
    moneyAccountName: '',
    moneyAccountNumber: '',
    moneyInitialBalance: '',
    groupAccountName: '',
    groupBankName: '',
    groupAccountNumber: '',
    groupInitialBalance: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved Data:', formData); // Replace with API call or local storage
    alert('Data saved successfully!');
  };
  localStorage.setItem('formData', JSON.stringify(formData));


  return (
    <div className="money-container">
      <div className="button-group">
        <button
          className={activeAccount === 'money' ? 'active' : ''}
          onClick={() => setActiveAccount('money')}
        >
          Money Account
        </button>
        <button
          className={activeAccount === 'group' ? 'active' : ''}
          onClick={() => setActiveAccount('group')}
        >
          Group Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-section">
        {activeAccount === 'money' && (
          <>
            <label>Mobile Money Provider</label>
            <select name="provider" value={formData.provider} onChange={handleChange} required>
              <option value="">--select-mobile-moneyprovider--</option>
              <option value="mpesa">Safaricom Mpesa</option>
              <option value="airtel">Airtel Money</option>
              <option value="equity">Equity Bank</option>
            </select>

            <label>Mobile Money Account Name</label>
            <input
              type="text"
              name="moneyAccountName"
              value={formData.moneyAccountName}
              onChange={handleChange}
              placeholder="Account Name"
              required
            />

            <label>Account Number</label>
            <input
              type="number"  maxLength='10'
              name="moneyAccountNumber"
              value={formData.moneyAccountNumber}
              onChange={handleChange}
              placeholder="Phone Number/Till Number/Paybill"
              required
            />

            <label>Initial Account Balance</label>
            <input
              type="currency"
              name="moneyInitialBalance"
              value={formData.moneyInitialBalance}
              onChange={handleChange}
              placeholder="Account Balance"
              required
            />
          </>
        )}

        {activeAccount === 'group' && (
          <>
            <label>Group Account Name</label>
            <input
              type="text"
              name="groupAccountName"
              value={formData.groupAccountName}
              onChange={handleChange}
              placeholder="Group Name"
              required
            />

            <label>Bank Name</label>
            <input
              type="text"
              name="groupBankName"
              value={formData.groupBankName}
              onChange={handleChange}
              placeholder="Bank Name"
              required
            />

            <label>Group Account Number</label>
            <input
              type="number" maxLength='10'
              name="groupAccountNumber"
              value={formData.groupAccountNumber}
              onChange={handleChange}
              placeholder="Account Number"
              required
            />

            <label>Initial Group Balance</label>
            <input
              type="number"
              name="groupInitialBalance"
              value={formData.groupInitialBalance}
              onChange={handleChange}
              placeholder="Initial Balance"
              required
            />
          </>
        )}

        <button type="submit" className="submit-btn">Submit & Save</button>
      </form>
    </div>
  );
};

export default Money;
