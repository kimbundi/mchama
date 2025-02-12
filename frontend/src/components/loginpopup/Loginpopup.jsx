import React, { useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'


const Loginpopup = ({setShowLogin}) => {
    const [currState,setCurrState] = useState('login')
    
  return (
    <div className='login-popup'>
        <form action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)}  src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState === 'login' ? <></> :                <input type="text" placeholder='JINA YAKO' required />
 }                <input type="email" placeholder='Barua Pepe Yako' required />
                <input type="password" placeholder='Weka Neno Lako la siri' required />

            </div>
            <button>{currState === 'sign up' ? 'Fungua akaunti mpya' : "Login"}</button>
            <div className='login-popup-condition'>
                <input type="checkbox" name="" id=""  required />
                <p>Kwa kuendelea, ninakubali sheria na masharti na sera ya faragha</p>

            </div>
            {currState === 'login' ?            <p>Fungua akaunti mpya? <span  onClick={()=>setCurrState('sign up')}>Bonyeza hapa</span></p>
:             <p>Je, tayari una akaunti?<span  onClick={()=>setCurrState('login')}>kuingia login
</span></p>
}
        </form>



    </div>
  )
}

export default Loginpopup