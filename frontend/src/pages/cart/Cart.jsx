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
    
    
    <input type="text"  required  placeholder='Nambari ya Kitambulisho/Nambari ya Pasipoti' />
    <input type="email"   placeholder='Anwani ya Barua Pepe'/>
    <input type="number"  placeholder='Nambari ya Simu' />

    </div>
    
    <div className="multi-fields">
      <input type="text"  required  placeholder='Anwani ya Nyumbani'/>
      <input type="text"  required  placeholder='Nambari ya Posta' />
    </div>
    <div className="multi-fields">
      <input type="text"  required  placeholder='Hali ya Ajira'/>
      <input type="text"  required  placeholder='Mapato ya Kila Mwezi' />
    </div>
  </div>
  <div className="place-loan-right">
    <div className="multi-fields">
      <input type="text"  required  placeholder='Kiasi cha Mkopo Kinachohitajika'/>
      <input type="text"  required  placeholder='Madhumuni ya Mkopo' />
      <input type="text"  required  placeholder='Muda wa Kulipa Mkopo' />
    </div>
    <div className="multi-fields">
      <input type="text"  required  placeholder='Jina la Mtu wa Karibu'/>
      <input type="text"  required  placeholder='Nambari ya Simu ya Mtu wa Karibu' />
      <input type="text"  required  placeholder='Uhusiano' />
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