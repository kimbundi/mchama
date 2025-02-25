import React, { useState } from 'react';
import './Contribution.css';

const Contribution = () => {
  const [formData, setFormData] = useState({
    contributionName: '',
    memberContribution: '',
    startDate: '',
    frequency: '',
    wish: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem('contributionData', JSON.stringify(formData)); // You can replace this with an API call to store in a database
    alert("Mchango umehifadhiwa kwa mafanikio!");
  };

  return (
    <form className="contribution-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="contributionName" className="form-label">Jina la Mchango</label>
        <input
          type="text"
          id="contributionName"
          name="contributionName"
          className="form-input"
          placeholder='mfano akiba'
          value={formData.contributionName}
          onChange={handleChange}
        />

        <label htmlFor="memberContribution" className="form-label">Mchango wa Kila Mwanachama kwa Mzunguko</label>
        <input
          type="text"
          id="memberContribution"
          name="memberContribution"
          className="form-input"
          placeholder='mfano 2000'
          value={formData.memberContribution}
          onChange={handleChange}
        />

        <label htmlFor="startDate" className="form-label">Tarehe ya Kuanza Mchango</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="form-input"
          value={formData.startDate}
          onChange={handleChange}
        />

        <label htmlFor="frequency" className="form-label">Wanachama huchangia mara ngapi?</label>
        <select
          id="frequency"
          name="frequency"
          className="form-select"
          value={formData.frequency}
          onChange={handleChange}
        >
          <option value="" disabled>--chagua-mara-ya-uchangiaji--</option>
          <option value="month">Mara moja kwa Mwezi</option>
          <option value="week">Mara moja kwa Wiki</option>
          <option value="day">Mara moja kwa Siku</option>
        </select>

        <label className="form-label">Je, ungependa Mchama itume ankara za mara kwa mara kwa wanachama wako?</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="wish"
              value="yes"
              className="radio-input"
              checked={formData.wish === 'yes'}
              onChange={handleChange}
            />
            <span>Ndio</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="wish"
              value="no"
              className="radio-input"
              checked={formData.wish === 'no'}
              onChange={handleChange}
            />
            <span>Hapana</span>
          </label>
        </div>

        <div className="button-group">
          <button type='submit' className="btn save-btn">Hifadhi Mabadiliko</button>
          <button
            type='button'
            className="btn cancel-btn"
            onClick={() => setFormData({ contributionName: '', memberContribution: '', startDate: '', frequency: '', wish: '' })}
          >
            Ghairi
          </button>
        </div>
      </div>
    </form>
  );
};

export default Contribution;
