import React, { useState } from 'react'
import './Mchama.css'
import Table from '../../components/tables/Table';
import Contribution from '../../components/groupcontribution/Contribution';

const Mchama = () => {

  const [showTable, setShowTable] = useState(false);

  const handleAddMember = () => {
    setShowTable(true); // Display the table on button click
  };

  const [Registered,isRegistered] =  useState(null);
  const [current,stepCurrent] = useState(1);
  

  const handleSubmitStep1 = (e) => {
    e.preventDefault();  
    stepCurrent(2);   
  }
  const handleSubmitStep2 = (e) => {
    e.preventDefault();  
    stepCurrent(3);   
  }
  
  const handleSubmitStep3 = (e) => {
    e.preventDefault();  
    stepCurrent(4);   
  };
  return (
    <div className='mchama'>
      <div className='upper-section'>
        <ul className='steps-list'>
          <li className='step-item'><span className={`number-circle ${current === 1 ? 'active' : ''}`}>1</span><span className='step-text'>Uundaji wa Kikundi</span></li>
          <li className='step-item'><span className={`number-circle ${current === 2 ? 'active' : ''}`}>2</span><span className='step-text'>Ongeza Washiriki</span></li>
          <li className='step-item'><span className={`number-circle ${current === 3 ? 'active' : ''}`}>3</span><span className='step-text'>Uundaji wa Michango</span></li>
          <li className='step-item'><span className={`number-circle ${current === 4 ? 'active' : ''}`}>4</span><span className='step-text'>Aina za Mikopo</span></li>
          <li className='step-item'><span className={`number-circle ${current === 5 ? 'active' : ''}`}>5</span><span className='step-text'>Uundaji wa Akaunti ya Benki</span></li>
          <li className='step-item'><span className={`number-circle ${current === 6 ? 'active' : ''}`}>6</span><span className='step-text'>Uhakikisho</span></li>
        </ul>
      </div>
      <hr className='divider' />
      {current ===1 && (  <div className='group-setup'>
        <h1 className='section-title'>Maelezo ya Uundaji wa Kikundi</h1>
        <form className='group-form'  onSubmit={handleSubmitStep1}>
          <div className='form-group'>
            <label htmlFor="groupName" className='form-label'>Jina la Kikundi</label>
            <input type="text" id="groupName" placeholder='Andika jina la kikundi'   required  className='form-input' />
          </div>

          <div className='form-group'>
            <label htmlFor="memberCount"    className='form-label'>Ni wanachama wangapi katika shirika?</label>
            <input type="number" id="memberCount" placeholder='mfano: 10' className='form-input'   required/>
          </div>

          <div className='form-group'>
            <label htmlFor="groupType" className='form-label'>Aina ya Kikundi</label>
            <select id="groupType" className='form-select' required>
              <option value="" disabled selected>--Chagua aina--</option>
              <option value="">Klabu ya Uwekezaji</option>
              <option value="">Chama</option>
              <option value="">Sacco</option>
              <option value="">Merry-go-round</option>
              <option value="">Kikundi cha Ustawi</option>
              <option value="">Kikundi cha Table Banking</option>
              <option value="">Kikundi cha Kujisaidia</option>
              <option value="">Mkopo wa Kidijitali</option>
              <option value="">Shirika Linalotegemea Jamii</option>
              <option value="">Kikundi cha Vijana</option>
              <option value="">Kikundi cha Wanawake</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor="organizationRole" className='form-label'>Nafasi yako katika shirika</label>
            <select id="organizationRole" className='form-select'  required>
              <option value="" disabled selected>--Chagua nafasi ya shirika--</option>
              <option value="">Mwenyekiti</option>
              <option value="">Mweka Hazina</option>
              <option value="">Katibu</option>
              <option value="">Katibu wa Mpangilio</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor="operationCounty" className='form-label'>Kaunti ya Uendeshaji</label>
            <select id="operationCounty" className='form-select' required>
            <option value="" >Kenya</option>
              <option value="">Uganda</option>
              <option value="">Tanzania</option>
              <option value="">Rwanda</option>
              <option value="">Burundi</option>
              
            </select>
          </div>

          <div className='form-group checkbox-group'>
            <label className='form-label'>Je, shirika lako limeandikishwa?</label>
            <div className='checkbox-options'>
              <label className='checkbox-label'><input type="radio" name="entity"  onChange={()=>isRegistered(true)}   value="yes"/> <span>Ndio</span></label>
              <label className='checkbox-label'><input type="radio"  name='entity' onChange={()=>isRegistered(false)}  value='no'/> <span>Hapana</span></label>
            </div>
            {Registered &&  <div className='registration-input'>
          <label htmlFor="registrationNumber" className='form-label'>Ingiza Nambari ya Usajili wa Kikundi</label>
          <input 
            type="text"  
            id="registrationNumber"
            placeholder='EGBAZ544GG65'    
            className='form-input' 
          />
        </div> }
            
          </div>

          <button 
          type="submit" 
          className='next-button' 
          onClick={() => setCurrentStep((prev) => (prev < 6 ? prev + 1 : prev))}
        >
          Hifadhi na Endelea
        </button>
        </form>
      </div>

      )}
   {current ===2 && (
    <>
    <form action="" onSubmit={handleSubmitStep2}>
    <div className='add'>
  <h1 className='section-title'>Group Member Details</h1>
  <button className='btn'   onClick={handleAddMember}>Add Member</button>
</div>
{showTable && <Table/>}
</form>

    
    </>
   )}

   {current ===3 &&(
    <>
    <form action="" onSubmit={handleSubmitStep3}>
    <div>
      <h1 className='section-title'>Group contribution Setup</h1>
      <br/>
      <Contribution/>


    </div>
    </form>
    </>
   )}
      
     
    </div>
  )
}

export default Mchama;