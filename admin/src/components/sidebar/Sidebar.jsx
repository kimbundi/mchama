import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt=""  />
                <p>Mchama members</p>

            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt=""  />

                <p>Loan Member Details</p>
                
            </NavLink>
            <NavLink to='/requests' className="sidebar-option">
                <img src={assets.order_icon} alt=""  />
                <p>Loan Requests</p>
                
            </NavLink>
            <NavLink to='/mchama' className="sidebar-option">
                <img src={assets.order_icon} alt=""  />
                <p>Mchama Details</p>
                
            </NavLink>
        </div>

        </div>
  )
}

export default Sidebar