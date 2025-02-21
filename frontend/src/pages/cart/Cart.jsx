import React from 'react'
import './Cart.css'

const Cart = () => {
  return (
    <form action="" className='place-loan'>
  <div className="place-loan-left">
    <p className='title'>Jaza Maelezo ili Kupokea Mkopo</p>
    <div className="multi-fields">
      <input type="text"  required  placeholder='Jina la Kwanza'/>
      <input type="text"  required  placeholder='Jina la Mwisho' />
    
    
    <input type="number"  required  placeholder='Nambari ya Kitambulisho/Nambari ya Pasipoti' />
   
    <select className='selection'>
      <option value="" disabled selected>Jinsia</option>
      <option value="">Kiume</option>
      <option value="">Kike</option>
    </select>
    <input type="tel"  placeholder='Nambari ya Simu' maxLength='10'/>

    </div>
    
    <div className="multi-fields">
    <label htmlFor="birthdate"  className='birth'>Tarehe ya Kuzaliwa</label>
      <input type="date"  required  placeholder='Tarehe ya Kuzaliwa'/>
      
    </div>
    <select name="" id="" className="selection">
  <option value="" disabled selected>Mapato ya kila Mwezi</option>
  <option value="less_than_10000">Chini ya KSh 10,000</option>
  <option value="less_than_30000">Chini ya KSh 30,000</option>
  <option value="less_than_60000">Chini ya KSh 60,000</option>
</select>
  </div>
  <div className="place-loan-right">
    <div className="multi-fields">
      <input type="text"  required  placeholder='Kiasi cha Mkopo Kinachohitajika'/>

      <select name="" id="" className="selection">
  <option value="" disabled selected>Ajira</option>
  <option value="teacher">Mwalimu</option>
  <option value="doctor">Daktari</option>
  <option value="engineer">Mhandisi</option>
  <option value="farmer">Mkulima</option>
  <option value="nurse">Muuguzi</option>
</select>

    </div>
    <div className="multi-fields">
      <input type="text"  required  placeholder='Jina la Mtu wa Karibu'/>
      <input type="tel" maxLength='10'  required  placeholder='Nambari ya Simu ya Mtu wa Karibu' />
      <select name="uhusiano" id="uhusiano" className="selection" required>
  <option value="" disabled selected>Uhusiano</option>
  <option value="mzazi">Mzazi</option>
  <option value="rafiki">Rafiki</option>
  <option value="ndugu">Ndugu</option>
  <option value="mwenza">Mwenza</option>
  <option value="mwalimu">Mwalimu</option>
  <option value="boss">Bosi</option>
</select>

    </div>
    <div className='place-btn'>
      <input type="checkbox" name="" id="" />
      <p>Kwa kubofya hii, unakubali masharti yetu</p>
      <button>WASILISHA</button>
    </div>
  </div>
</form>

  )
}

export default Cart