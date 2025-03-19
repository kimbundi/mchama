import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/list" className="sidebar-option">
          <p>Loan Member Details</p>
        </NavLink>
        <NavLink to="/requests" className="sidebar-option">
          <p>Update Loan Requests</p>
        </NavLink>
        <NavLink to="/given" className="sidebar-option">
          <p>Loans</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
