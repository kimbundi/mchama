import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("adminToken"); // Clear token
        toast.success( "logged out")
        window.location.reload(); // Refresh page after logout
    };

    return (
        <div className='navbar'>
            <img src={assets.logo} alt="Logo" className='logo' />
            
            {/* Profile Section with Dropdown */}
            <div className="profile-container">
                <img 
                    src={assets.dan_image} 
                    alt="Profile" 
                    className='profile' 
                    onClick={() => setShowDropdown(!showDropdown)} 
                />

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div className="dropdown-menu">
                        <ul>
                            <li>Profile</li>
                            <li>Settings</li>
                            <li onClick={handleLogout}  >Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
