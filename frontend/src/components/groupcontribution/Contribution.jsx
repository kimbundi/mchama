import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { storeContext } from '../../context/Storecontext';
import './Contribution.css';

const Contribution = () => {
  const { url, list } = useContext(storeContext);

  const [formData, setFormData] = useState({
    contributionName: '',
    memberContribution: '',
    startDate: '',
    frequency: '',
    wish: '',
    groupId: '',
  });

  // Auto-set first available group ID when list updates
  useEffect(() => {
    if (list.length > 0) {
      setFormData(prev => ({ ...prev, groupId: list[0] })); // Set first group_id
    }
  }, [list]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Being Sent:", formData);

    try {
      const response = await axios.post(`${url}/api/contribution/add`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response from Backend:", response.data);

      if (response.data.success) {
        toast.success("✅ Mchango umehifadhiwa kwa mafanikio!", { position: "top-right", autoClose: 3000 });

        setFormData({
          contributionName: '',
          memberContribution: '',
          startDate: '',
          frequency: '',
          wish: '',
          groupId: list.length > 0 ? list[0] : '', // Reset with first group_id
        });
      } else {
        toast.error("❌ Mchango haujahifadhiwa. Tafadhali jaribu tena.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      toast.error("❌ Kuna tatizo. Tafadhali jaribu tena.", { position: "top-right", autoClose: 3000 });
    }
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
          placeholder="mfano akiba"
          value={formData.contributionName}
          onChange={handleChange}
        />

        <label htmlFor="groupid" className="form-label">Chagua Group</label>
        <select
          id="group_id"
          name="groupId"
          className="form-select"
          value={formData.groupId}
          onChange={handleChange}
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

        <label htmlFor="memberContribution" className="form-label">Mchango wa Kila Mwanachama kwa Mzunguko</label>
        <input
          type="text"
          id="memberContribution"
          name="memberContribution"
          className="form-input"
          placeholder="mfano 2000"
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
          <button type="submit" className="btn save-btn">Hifadhi Mabadiliko</button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={() =>
              setFormData({ contributionName: '', memberContribution: '', startDate: '', frequency: '', wish: '', group_id: list.length > 0 ? list[0] : '' })
            }
          >
            Ghairi
          </button>
        </div>
      </div>
    </form>
  );
};

export default Contribution;
