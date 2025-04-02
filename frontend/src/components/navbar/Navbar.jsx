import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/Storecontext';

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { token, setToken,logout } = useContext(storeContext);
  const [menu, setMenu] = useState(localStorage.getItem("activeMenu") || "how");

  // Save active menu in localStorage
  

  return (
    <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt="" className='logo' /></Link>  
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("how")} className={menu === "how" ? "active" : ""}>Jinsi Inavyofanya Kazi</Link>
        <Link to='/dashboard' onClick={() => setMenu("mchama")} className={menu === "mchama" ? "active" : ""}>Mchama Dashboard</Link> {/* ✅ Fixed route */}
        <a href='#loan-products' onClick={() => setMenu("loan")} className={menu === "loan" ? "active" : ""}>Bidhaa za Mikopo</a>
        <a href='#loanitem' onClick={() => setMenu("group")} className={menu === "group" ? "active" : ""}>Akiba ya Kikundi</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Wasiliana Nasi</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart"> <img src={assets.basket_icon} alt="" className='loan-icon' /></Link>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Loan Requests</p></li>
              <li><img src={assets.logo} alt="" /><p>Mchama</p></li>
              <Link to="/order"><p>My Loans</p></Link>
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
