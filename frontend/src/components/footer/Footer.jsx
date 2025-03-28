import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=""  className='logo'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor commodi doloremque earum odit veniam iste dolore, tempore excepturi cumque nesciunt?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />

                </div>
            </div>
            <div className="footer-content-center">
            <h2>Kampuni</h2>
<ul>
    <Link to='/' >  <li>Nyumbani</li></Link>
    
    <Link to='/about' ><li>Kuhusu Sisi</li></Link> 
    <a href='#loan-products'> <li>Bidhaa za Mikopo</li> </a>
    <li>Sera ya Faragha</li>
</ul>

            </div>
            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <ul>
                    <li>0745517657</li>
                    <li>contact</li>
                    

                </ul>
            </div>
            
        </div>
        <hr/>
        <p className="footer-copyright">copyright 2025  &copy;
        -All Right Reserved.</p>

    </div>
  )
}

export default Footer