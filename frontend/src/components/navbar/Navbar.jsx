import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("how");
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
            <button   onClick={()=>setShowLogin(true)}>Sign In</button>
        </div>



    </div>
  )
}

export default Navbar