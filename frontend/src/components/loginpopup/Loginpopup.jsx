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
                {currState === 'login' ? <></> :                <input type="text" placeholder='Your Name' required />
 }                <input type="email" placeholder='Your Email' required />
                <input type="password" placeholder='Password' required />

            </div>
            <button>{currState === 'sign up' ? 'Create account' : "Login"}</button>
            <div className='login-popup-condition'>
                <input type="checkbox" name="" id=""  required />
                <p>By continuing,i agree to the terms of use & privacy policy</p>

            </div>
            {currState === 'login' ?            <p>Create a new account? <span  onClick={()=>setCurrState('sign up')}>Click here</span></p>
:             <p>Already have an account?<span  onClick={()=>setCurrState('login')}>Login here</span></p>
}
        </form>



    </div>
  )
}

export default Loginpopup