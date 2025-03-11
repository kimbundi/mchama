import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeContext } from '../../context/Storecontext'


const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate();

    const [menu,setMenu] = useState("how");
    const {token,setToken} = useContext(storeContext)
    const logout = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")


    }
    
  return (
    <div className='navbar'>

      <Link to='/'>  <img src={assets.logo} alt=""   className='logo'/></Link>  
        <ul className="navbar-menu">
            
            <Link to='/' onClick={()=>setMenu("how")}    className={menu === "how" ? "active" : ""}>jinsi inavyofanya kazi</Link>
            <a href='#loan-products'  onClick={()=>setMenu("loan")} className={menu === "loan" ? "active" : ""}>Bidhaa za Mikopo</a>
            <a href='#loanitem' onClick={()=>setMenu("group")}  className={menu === "group" ? "active" : ""}>akiba ya kikundi</a>
            <a href='#footer' onClick={()=>setMenu("contact")}  className={menu === "contact" ? "active" : ""}>wasiliana nasi</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
              <Link to="/cart">  <img src={assets.basket_icon} alt="" /></Link>  
                <div className="dot"></div>
             
            </div>
            {!token ?
                        <button   onClick={()=>setShowLogin(true)}>Sign In</button>

            :
            <div className='navbar-profile'>
                 <img src={assets.profile_icon} alt="" />
                 <ul className="nav-profile-dropdown">
                  <li> <img src={assets.bag_icon} alt="" /><p>Loan Requests</p> </li>
                  <li> <img src={assets.logo} alt="" />  <p>Mchama</p></li>
                  <hr/>
                  <li  onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>

                 </ul>

              
              </div>}
        </div>



    </div>
  )
}

export default Navbar