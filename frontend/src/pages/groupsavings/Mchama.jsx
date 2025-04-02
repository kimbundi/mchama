import React, { useContext, useState } from 'react';
import './Mchama.css';
import Table from '../../components/tables/Table';
import Contribution from '../../components/groupcontribution/Contribution';
import Money from '../../components/money/Money';
import { JSONTree } from 'react-json-tree';

import ContributionDetails from '../../components/groupcontribution/Contributiondetails';
import MemberDetails from '../../components/tables/Memberdetails';
import AccountDetails from '../../components/money/Accountdetails';
import GroupSections from '../../components/groupcontribution/Groupsection';
import Groupname from '../../components/groupcontribution/Groupname';
import { storeContext } from '../../context/Storecontext';

import axios  from 'axios';
import { toast } from 'react-toastify';
import GroupDetails from '../confirmation/Mchamaconfirmation';


const Mchama = () => {
  const {url,token} = useContext(storeContext)

  

  const savedData = JSON.parse(localStorage.getItem('formData'));
  const savedTableData = JSON.parse(localStorage.getItem('tableData')) || [];
  const contributionData =JSON.parse( localStorage.getItem('contributionData'));

console.log(savedTableData); // Logs the saved rows
const [showNameDetails, setShowNameDetails] = useState(false);



  const [data, setData] = useState({
    groupName: '',
    memberCount: '',
    groupType: '',
    organizationRole: '',
    operationCounty: '',
    isRegistered: null,
    registrationNumber: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [showAccount,setShowAccount] = useState(false);


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setData((prev) => ({
      ...prev,
      isRegistered: value,
      registrationNumber: value === 'yes' ? prev.registrationNumber : '',
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Form Data Being Sent:", data); // Debugging
  
    try {
      const response = await axios.post(
        `${url}/api/group/add`,
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );
      
  
      console.log("Response from Backend:", response.data);
  
      if (response.data.success) {
        setData({
          groupName: '',
          memberCount: '',
          groupType: '',
          organizationRole: '',
          operationCounty: '',
          isRegistered: null,
          registrationNumber: '',
        });
        toast.success("Group has been created successfully")
      } else {
        toast.error("Group not created .");
      }
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      toast.error("Kuna tatizo. Tafadhali jaribu tena.");
    }
  };

  const handleAddAccount = ()=>{
    setShowAccount(true);

  }

  const handleAddMember = () => {
    setShowTable(true);
  };

  return (
    <div className='mchama'>
      <div className='upper-section'>
        <ul className='steps-list'>
          {[1, 2, 3, 4, 5].map((step) => (
            <li key={step} className='step-item'>
              <span className={`number-circle ${currentStep === step ? 'active' : ''}`}>{step}</span>
              <span className='step-text'>
                {step === 1 && 'Uundaji wa Kikundi'}
                {step === 2 && 'Ongeza Washiriki'}
                {step === 3 && 'Uundaji wa Michango'}
                {step === 4 && 'Uundaji wa Akaunti ya Benki'}
                {step === 5 && 'Uhakikisho'}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <hr className='divider' />

      {currentStep === 1 && (
        <form className='group-form' onSubmit={onSubmitHandler}>
          <h1 className='section-title'>Maelezo ya Uundaji wa Kikundi</h1>

          <div className='form-group'>
            <label htmlFor="groupName" className='form-label'>Jina la Kikundi</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={data.groupName}
              onChange={onChangeHandler}
              placeholder='Andika jina la kikundi'
              className='form-input'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="memberCount" className='form-label'>Wanachama Wangapi?</label>
            <input
              type="number"
              id="memberCount"
              name="memberCount"
              value={data.memberCount}
              onChange={onChangeHandler}
              placeholder='mfano: 10'
              min="1"
              className='form-input'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="groupType" className='form-label'>Aina ya Kikundi</label>
            <select
              id="groupType"
              name="groupType"
              value={data.groupType}
              onChange={onChangeHandler}
              className='form-select'
              required
            >
              <option value="" disabled>--Chagua aina--</option>
              <option value="Klabu ya Uwekezaji">Klabu ya Uwekezaji</option>
              <option value="Chama">Chama</option>
              <option value="Sacco">Sacco</option>
              <option value="Merry-go-round">Merry-go-round</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor="organizationRole" className='form-label'>Nafasi yako katika shirika</label>
            <select
              id="organizationRole"
              name="organizationRole"
              value={data.organizationRole}
              onChange={onChangeHandler}
              className='form-select'
              required
            >
              <option value="" disabled>--Chagua nafasi--</option>
              <option value="Mwenyekiti">Mwenyekiti</option>
              <option value="Mweka Hazina">Mweka Hazina</option>
              <option value="Katibu">Katibu</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor="operationCounty" className='form-label'>Kaunti ya Uendeshaji</label>
            <select
              id="operationCounty"
              name="operationCounty"
              value={data.operationCounty}
              onChange={onChangeHandler}
              className='form-select'
              required
            >
              <option value="" disabled>--Chagua nchi--</option>
              <option value="Kenya">Kenya</option>
              <option value="Uganda">Uganda</option>
              <option value="Tanzania">Tanzania</option>
            </select>
          </div>

          <div className='form-group checkbox-group'>
            <label className='form-label'>Je, shirika lako limeandikishwa?</label>
            <label>
              <input
                type="radio"
                name="isRegistered"
                checked={data.isRegistered === 'yes'}
                onChange={() => handleRadioChange('yes')}
              /> Ndio
            </label>
            <label>
              <input
                type="radio"
                name="isRegistered"
                checked={data.isRegistered === 'no'}
                onChange={() => handleRadioChange('no')}
              /> Hapana
            </label>

            {data.isRegistered === 'yes' && (
              <div className='registration-input'>
                <label htmlFor="registrationNumber" className='form-label'>Nambari ya Usajili</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={data.registrationNumber}
                  onChange={onChangeHandler}
                  placeholder='Mfano: EGBAZ544GG65'
                  className='form-input'
                  required
                />
              </div>
            )}
          </div>

          <div className='button-group'>
            <button type="submit" className='next-button'>Hifadhi</button>
            <button onClick={handleNext} className='next-button'>Endelea</button>
          </div>
         
        </form>
      )}

      {currentStep === 2 && (
        <div>
          <h1 className='section-title'>Ongeza Washiriki</h1>
          <button className='btn' onClick={handleAddMember}>Ongeza Mshiriki</button>
          {showTable && <Table />}
          <div className='button-group'>
            <button onClick={handlePrevious} className='prev-button'>Rudi</button>
            <button onClick={handleNext} className='next-button'>Endelea</button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h1 className='section-title'>Uundaji wa Michango</h1>
          <Contribution />
          <div className='button-group'>
            <button onClick={handlePrevious} className='prev-button'>Rudi</button>
            <button onClick={handleNext} className='next-button'>Endelea</button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h1 className='section-title'>Uundaji wa Akaunti ya Benki</h1>
          
          <button className='btn' onClick={handleAddAccount}>Add Account</button>
          {showAccount && <Money/>}
          <div className='button-group'>
            <button onClick={handlePrevious} className='prev-button'>Rudi</button>
            <button onClick={handleNext} className='next-button'>Endelea</button>
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div>
        <h1 className='section-title'>Muhtasari na Uthibitisho</h1>
        <p>
        Hayo ndiyo yote tunahitaji kwa sasa. Tafadhali kagua data yako hapa chini kabla ya kuwasilisha.</p>
        {currentStep === 5 && (
 <div>
 
 <button className="section-button" onClick={() => setShowNameDetails(!showNameDetails)}>
        {showNameDetails ? '🔽' : '▶️'} Taarifa Za Kikundi
      </button>
      {showNameDetails && 
      (

       
        <GroupDetails/>

        
      )}


</div>
)}
     
      <GroupSections/>

      <div className="terms-container">

      <input type="checkbox" name="" id=""    className="terms-checkbox"/>
      <label htmlFor="terms" className="terms-label">I have read and agreed to the terms and conditions</label>
        </div>
        <div className='button-container'>
        <button onClick={handlePrevious} className='prev-button'>Rudi</button>
        <button  className='submit-button'>Submit</button>

        </div>
    
       
      </div>
      )}
    </div>
  );
};

export default Mchama;