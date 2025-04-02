import React, { useContext, useState } from 'react';
import './Loginpopup.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { storeContext } from '../../context/Storecontext';
import { toast } from 'react-toastify';

const Loginpopup = ({setShowLogin}) => {
    const { url, setToken, } = useContext(storeContext);  // ✅ Ensure setShowLogin is here
    

    const [currState, setCurrState] = useState('login');
    const [data, setData] = useState({
        name: "",
        phonenumber: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url + (currState === "login" ? "/api/user/login" : "/api/user/register");

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                toast.success(response.data.message || "login successful")
                setShowLogin(false); // ✅ Close modal after login
            } else {
                alert(response.data.message);
                toast.error(response.data.message|| "Error occured")
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Failed to log in. Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    {/* ✅ Close button should now work */}
                    <img src={assets.cross_icon} alt="Close" onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currState !== 'login' && (
                        <input type="text" name='name' value={data.name} onChange={onChangeHandler} placeholder='JINA YAKO' required />
                    )}
                    <input type="tel" name="phonenumber" value={data.phonenumber} onChange={onChangeHandler}
                        placeholder="Weka namba yako ya simu" pattern="^\+254[7-9][0-9]{8}$" required
                        onInput={(e) => { if (!e.target.value.startsWith("+254")) e.target.value = "+254"; }} />
                    <input type="password" name='password' value={data.password} onChange={onChangeHandler} placeholder='Weka Neno Lako la siri' required />
                </div>
                <button type='submit'>{currState === 'sign up' ? 'Fungua akaunti mpya' : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>Kwa kuendelea, ninakubali sheria na masharti na sera ya faragha</p>
                </div>
                {currState === 'login' ? (
                    <p>Fungua akaunti mpya? <span onClick={() => setCurrState('sign up')}>Bonyeza hapa</span></p>
                ) : (
                    <p>Je, tayari una akaunti? <span onClick={() => setCurrState('login')}>ingia login</span></p>
                )}
            </form>
        </div>
    );
};

export default Loginpopup;
