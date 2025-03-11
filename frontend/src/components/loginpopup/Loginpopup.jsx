import React, { useContext, useEffect, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { storeContext } from '../../context/Storecontext'


const Loginpopup = ({setShowLogin}) => {
    const { url, token, setToken } = useContext(storeContext);
    const [currState,setCurrState] = useState('login')
    const [data,setData]  = useState({
        name:"",
        phonenumber:"",
        password:""
    })


const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))

}

const onLogin = async(event) =>{
    event.preventDefault();
    let newUrl= url;
    if(currState==="login") {
        newUrl += "/api/user/login"

    }
    else {
        newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data);
    if(response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)

        
    }
    else {
        alert(response.data.message)
    }


}


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)}  src={assets.cross_icon} alt="not" />
            </div>
            <div className="login-popup-inputs">
                {currState === 'login' ? <></> :                <input type="text"   name='name'  value={data.name} onChange={onChangeHandler} placeholder='JINA YAKO' required />
 }                <input 
 type="tel"  
 name="phonenumber"  
 value={data.phonenumber}  
 onChange={onChangeHandler}  
 placeholder="Weka namba yako ya simu"  
 pattern="^\+254[7-9][0-9]{8}$" 
 required 
 onInput={(e) => {
    if (!e.target.value.startsWith("+254")) {
      e.target.value = "+254";
    }
  }}
/>
                <input type="password"    name='password'  value={data.password} onChange={onChangeHandler} placeholder='Weka Neno Lako la siri' required />

            </div>
            <button   type='submit'>{currState === 'sign up' ? 'Fungua akaunti mpya' : "Login"}</button>
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