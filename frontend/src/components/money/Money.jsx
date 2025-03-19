import React, { useContext, useEffect, useState } from 'react';
import './Money.css';
import { storeContext } from '../../context/Storecontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Money = () => {

  const {url,list} = useContext(storeContext);
  const [activeAccount, setActiveAccount] = useState('money'); // Active form selection
  const [data, setData] = useState({
    provider: '',
    groupId: '',
    moneyAccountName: '',
    moneyAccountNumber: '',
    moneyInitialBalance: '',
    groupAccountName: '',
    groupBankName: '',
    groupAccountNumber: '',
    groupInitialBalance: '',
  });

  // Auto-set first available group ID when list updates
  useEffect(() => {
    if (list.length > 0) {
      setData(prev => ({ ...prev, groupId: list[0] })); // Set first group_id
    }
  }, [list]);
  // Handle input changes
  
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission;
  
    const onSubmitHandler = async (event) => {
      event.preventDefault();
      console.log("Form Data Being Sent:", data); // Debugging
    
      try {
        const response = await axios.post(`${url}/api/bank/add`, {
          ...data,
          
        }, {
          headers: { "Content-Type": "application/json" },
        });
    
        console.log("Response from Backend:", response.data);
    
        if (response.data.success) {
          setData({
            provider: '',
            groupId: list.length > 0 ? list[0] : '',
            moneyAccountName: '',
            moneyAccountNumber: '',
            moneyInitialBalance: '',
            groupAccountName: '',
            groupBankName: '',
            groupAccountNumber: '',
            groupInitialBalance: '',
          });
          toast.success("data has been saved successfully!")
        } else {
          toast.error("data not saved.");
        }
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
        toast.error("Kuna tatizo. Tafadhali jaribu tena.");
      }
    };
  
  


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

      <form onSubmit={onSubmitHandler} className="form-section">
        {activeAccount === 'money' && (
          <>

<label htmlFor="groupid" className="form-label">Chagua Group</label>
        <select
          id="group_id"
          name="groupId"
          className="form-select"
          value={data.groupId}
          onChange={onChangeHandler}
        >
          {list.length === 0 ? (
            <option value="">Hakuna group zilizopatikana</option>
          ) : (
            list.map((id) => (
              <option key={id} value={id}>
                {id} {/* You can replace this with a group name if available */}
              </option>
            ))
          )}
        </select>

            <label>Mobile Money Provider</label>
            <select name="provider" value={data.provider} onChange={onChangeHandler} required>
              <option value="">--select-mobile-moneyprovider--</option>
              <option value="mpesa">Safaricom Mpesa</option>
              <option value="airtel">Airtel Money</option>
              <option value="equity">Equity Bank</option>
            </select>

            <label>Mobile Money Account Name</label>
            <input
              type="text"
              name="moneyAccountName"
              value={data.moneyAccountName}
              onChange={onChangeHandler}
              placeholder="Account Name"
              required
            />

            <label>Account Number</label>
            <input
              type="number"  maxLength='10'
              name="moneyAccountNumber"
              value={data.moneyAccountNumber}
              onChange={onChangeHandler}
              placeholder="Phone Number/Till Number/Paybill"
              required
            />

            <label>Initial Account Balance</label>
            <input
              type="currency"
              name="moneyInitialBalance"
              value={data.moneyInitialBalance}
              onChange={onChangeHandler}
              placeholder="Account Balance"
              required
            />
          </>
        )}

        {activeAccount === 'group' && (
          <>


<label htmlFor="groupid" className="form-label">Chagua Group</label>
        <select
          id="group_id"
          name="groupId"
          className="form-select"
          value={data.groupId}
          onChange={onChangeHandler}
        >
          {list.length === 0 ? (
            <option value="">Hakuna group zilizopatikana</option>
          ) : (
            list.map((id) => (
              <option key={id} value={id}>
                {id} {/* You can replace this with a group name if available */}
              </option>
            ))
          )}
        </select>

            <label>Group Account Name</label>
            <input
              type="text"
              name="groupAccountName"
              value={data.groupAccountName}
              onChange={onChangeHandler}
              placeholder="Group Name"
              required
            />

            <label>Bank Name</label>
            <input
              type="text"
              name="groupBankName"
              value={data.groupBankName}
              onChange={onChangeHandler}
              placeholder="Bank Name"
              required
            />

            <label>Group Account Number</label>
            <input
              type="number" maxLength='10'
              name="groupAccountNumber"
              value={data.groupAccountNumber}
              onChange={onChangeHandler}
              placeholder="Account Number"
              required
            />

            <label>Initial Group Balance</label>
            <input
              type="number"
              name="groupInitialBalance"
              value={data.groupInitialBalance}
              onChange={onChangeHandler}
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
