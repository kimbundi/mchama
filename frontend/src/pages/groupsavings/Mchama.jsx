import React, { useState } from 'react';
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


const Mchama = () => {
  const savedData = JSON.parse(localStorage.getItem('formData'));
  const savedTableData = JSON.parse(localStorage.getItem('tableData')) || [];
  const contributionData =JSON.parse( localStorage.getItem('contributionData'));

console.log(savedTableData); // Logs the saved rows
const [showNameDetails, setShowNameDetails] = useState(false);


  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
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

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    console.log('Step 1 Data:', formData); // ✅ Data is logged and stored
    handleNext();
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
        <form className='group-form' onSubmit={handleSubmitStep1}>
          <h1 className='section-title'>Maelezo ya Uundaji wa Kikundi</h1>

          <div className='form-group'>
            <label htmlFor="groupName" className='form-label'>Jina la Kikundi</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
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
              value={formData.memberCount}
              onChange={handleChange}
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
              value={formData.groupType}
              onChange={handleChange}
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
              value={formData.organizationRole}
              onChange={handleChange}
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
              value={formData.operationCounty}
              onChange={handleChange}
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
                checked={formData.isRegistered === 'yes'}
                onChange={() => handleRadioChange('yes')}
              /> Ndio
            </label>
            <label>
              <input
                type="radio"
                name="isRegistered"
                checked={formData.isRegistered === 'no'}
                onChange={() => handleRadioChange('no')}
              /> Hapana
            </label>

            {formData.isRegistered === 'yes' && (
              <div className='registration-input'>
                <label htmlFor="registrationNumber" className='form-label'>Nambari ya Usajili</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder='Mfano: EGBAZ544GG65'
                  className='form-input'
                  required
                />
              </div>
            )}
          </div>

          <div className='button-group'>
            <button type="submit" className='next-button'>Hifadhi na Endelea</button>
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
      {showNameDetails && (
        
 <div className='summary-box'>
 <p><strong> Jina la Kikundi:</strong> {formData.groupName || 'Hakuna jibu'}</p>
 <p><strong> Idadi ya Wanachama:</strong> {formData.memberCount || 'Hakuna jibu'}</p>
 <p><strong> Aina ya Kikundi:</strong> {formData.groupType || 'Hakuna jibu'}</p>
 <p><strong> Nafasi Yako katika Shirika:</strong> {formData.organizationRole || 'Hakuna jibu'}</p>
 <p><strong> Kaunti ya Uendeshaji:</strong> {formData.operationCounty || 'Hakuna jibu'}</p>
 <p><strong> Je, shirika limeandikishwa?:</strong> 
   {formData.isRegistered === 'yes' ? 'Ndio' : formData.isRegistered === 'no' ? 'Hapana' : 'Hakuna jibu'}
 </p>

 {formData.isRegistered === 'yes' && (
   <p><strong> Nambari ya Usajili:</strong> {formData.registrationNumber || 'Hakuna jibu'}</p>
 )}
</div>
        
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