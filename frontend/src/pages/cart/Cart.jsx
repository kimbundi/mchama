import React from 'react'
import './Cart.css'

const Cart = () => {
  return (
    <form action="" className='place-loan'>
  <div className="place-loan-left">
    <p className='title'>Jaza Maelezo ili Kupokea Mkopo</p>
    <div className="multi-fields">
      <input type="text"  placeholder='Jina la Kwanza'/>
      <input type="text"  placeholder='Jina la Mwisho' />
    
    
    <input type="text"  placeholder='Nambari ya Kitambulisho/Nambari ya Pasipoti' />
    <input type="email"   placeholder='Anwani ya Barua Pepe'/>
    <input type="number"  placeholder='Nambari ya Simu' />

    </div>
    
    <div className="multi-fields">
      <input type="text"  placeholder='Anwani ya Nyumbani'/>
      <input type="text"  placeholder='Nambari ya Posta' />
    </div>
    <div className="multi-fields">
      <input type="text"  placeholder='Hali ya Ajira'/>
      <input type="text"  placeholder='Mapato ya Kila Mwezi' />
    </div>
  </div>
  <div className="place-loan-right">
    <div className="multi-fields">
      <input type="text"  placeholder='Kiasi cha Mkopo Kinachohitajika'/>
      <input type="text"  placeholder='Madhumuni ya Mkopo' />
      <input type="text"  placeholder='Muda wa Kulipa Mkopo' />
    </div>
    <div className="multi-fields">
      <input type="text"  placeholder='Jina la Mtu wa Karibu'/>
      <input type="text"  placeholder='Nambari ya Simu ya Mtu wa Karibu' />
      <input type="text"  placeholder='Uhusiano' />
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