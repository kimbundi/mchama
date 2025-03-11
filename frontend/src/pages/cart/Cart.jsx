import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios'
import { toast } from 'react-toastify';
import { storeContext } from '../../context/Storecontext';



const Cart = () => {
  const {url} = useContext(storeContext);

  

  
  const [data, setData] = useState({
    name: "",
    lastname: "",
    idnumber: "",
    gender: "",
    phonenumber: "",
    dob: "",
    monthlyincome: "",
    loanrequired: "",
    job: "",
    dependent: "",
    dependnumber: "",
    relationship: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Form Data Being Sent:", data); // Debugging
  
    try {
      const response = await axios.post(`${url}/api/loan/add`, {
        ...data,
        loanrequired: parseInt(data.loanrequired), // Ensure it's a number
      }, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response from Backend:", response.data);
  
      if (response.data.success) {
        setData({
          name: "",
          lastname: "",
          idnumber: "",
          gender: "",
          phonenumber: "",
          dob: "",
          monthlyincome: "",
          loanrequired: "",
          job: "",
          dependent: "",
          dependnumber: "",
          relationship: "",
        });
        toast.success("Ombi la mkopo limewasilishwa kwa mafanikio!")
      } else {
        toast.error("Imeshindikana kuwasilisha ombi la mkopo.");
      }
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      toast.error("Kuna tatizo. Tafadhali jaribu tena.");
    }
  };


  return (
    <form className='place-loan'  onSubmit={onSubmitHandler}>
      <div className="place-loan-left">
        <p className='title'>Jaza Maelezo ili Kupokea Mkopo</p>
        <div className="multi-fields">
          <input 
            name="name" 
            value={data.name} 
            onChange={onChangeHandler} 
            type="text" 
            required 
            placeholder='Jina la Kwanza'
          />
          <input 
            name="lastname" 
            value={data.lastname} 
            onChange={onChangeHandler} 
            type="text" 
            required 
            placeholder='Jina la Mwisho' 
          />
          <input 
            name="idnumber" 
            value={data.idnumber} 
            onChange={onChangeHandler} 
            type="number" 
            required 
            placeholder='Nambari ya Kitambulisho/Nambari ya Pasipoti' 
          />
          <select 
            name="gender" 
            value={data.gender} 
            onChange={onChangeHandler} 
            className='selection' 
            required
          >
            <option value="" disabled>Jinsia</option>
            <option value="Kiume">Kiume</option>
            <option value="Kike">Kike</option>
          </select>
          <input 
            name="phonenumber" 
            value={data.phonenumber} 
            onChange={onChangeHandler} 
            type="tel" 
            placeholder='Nambari ya Simu' 
            maxLength='10' 
            required
          />
        </div>

        <div className="multi-fields">
          <label htmlFor="birthdate" className='birth'>Tarehe ya Kuzaliwa</label>
          <input 
            name="dob" 
            value={data.dob} 
            onChange={onChangeHandler} 
            type="date" 
            required 
          />
        </div>

        <select 
          name="monthlyincome" 
          value={data.monthlyincome} 
          onChange={onChangeHandler} 
          className="selection" 
          required
        >
          <option value="" disabled>Mapato ya kila Mwezi</option>
          <option value="less_than_10000">Chini ya KSh 10,000</option>
          <option value="less_than_30000">Chini ya KSh 30,000</option>
          <option value="less_than_60000">Chini ya KSh 60,000</option>
        </select>
      </div>

      <div className="place-loan-right">
        <div className="multi-fields">
          <input 
            name="loanrequired" 
            value={data.loanrequired} 
            onChange={onChangeHandler} 
            type="text" 
            required 
            placeholder='Kiasi cha Mkopo Kinachohitajika' 
          />

          <select 
            name="job" 
            value={data.job} 
            onChange={onChangeHandler} 
            className="selection" 
            required
          >
            <option value="" disabled>Ajira</option>
            <option value="teacher">Mwalimu</option>
            <option value="doctor">Daktari</option>
            <option value="engineer">Mhandisi</option>
            <option value="farmer">Mkulima</option>
            <option value="nurse">Muuguzi</option>
          </select>
        </div>

        <div className="multi-fields">
          <input 
            name="dependent" 
            value={data.dependent} 
            onChange={onChangeHandler} 
            type="text" 
            required 
            placeholder='Jina la Mtu wa Karibu' 
          />
          <input 
            name="dependnumber" 
            value={data.dependnumber} 
            onChange={onChangeHandler} 
            type="tel" 
            maxLength='10' 
            required 
            placeholder='Nambari ya Simu ya Mtu wa Karibu' 
          />
          <select 
            name="relationship" 
            value={data.relationship} 
            onChange={onChangeHandler} 
            className="selection" 
            required
          >
            <option value="" disabled>Uhusiano</option>
            <option value="mzazi">Mzazi</option>
            <option value="rafiki">Rafiki</option>
            <option value="ndugu">Ndugu</option>
            <option value="mwenza">Mwenza</option>
            <option value="mwalimu">Mwalimu</option>
            <option value="boss">Bosi</option>
          </select>
        </div>

        <div className='place-btn'>
          <label className='flex items-center'>
            <input type="checkbox" required />
            <p className='ml-2'>Kwa kubofya hii, unakubali masharti yetu</p>
          </label>
          <button type="submit">WASILISHA</button>
        </div>
      </div>
    </form>
  );
};

export default Cart;
