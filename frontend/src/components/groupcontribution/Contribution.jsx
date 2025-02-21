
import React from 'react';
import './Contribution.css';

const Contribution = () => {
  return (
    <form className="contribution-form">
      <div className="form-group">
        <label htmlFor="contributionName" className="form-label">Jina la Mchango</label>
        <input type="text" id="contributionName" className="form-input" placeholder='mfano akiba' />

        <label htmlFor="memberContribution" className="form-label">Mchango wa Kila Mwanachama kwa Mzunguko</label>
        <input type="text" id="memberContribution" className="form-input" placeholder='mfano 2000' />

        <label htmlFor="startDate" className="form-label">Tarehe ya Kuanza Mchango</label>
        <input type="date" id="startDate" className="form-input" />

        <label htmlFor="frequency" className="form-label">Wanachama huchangia mara ngapi?</label>
        <select id="frequency" className="form-select">
          <option value="" disabled selected>--chagua-mara-ya-uchangiaji--</option>
          <option value="month">Mara moja kwa Mwezi</option>
          <option value="week">Mara moja kwa Wiki</option>
          <option value="day">Mara moja kwa Siku</option>
        </select>

        <label className="form-label">Je, ungependa Mchama itume ankara za mara kwa mara kwa wanachama wako?</label>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" name="wish" id="yes" className="radio-input" />
            <span>Ndio</span>
          </label>
          <label className="radio-label">
            <input type="radio" name="wish" id="no" className="radio-input" />
            <span>Hapana</span>
          </label>
        </div>

        <div className="button-group">
          <button type='submit' className="btn save-btn">Hifadhi Mabadiliko</button>
          <button type='button' className="btn cancel-btn">Ghairi</button>
        </div>
      </div>
    </form>
  );
};

export default Contribution;
