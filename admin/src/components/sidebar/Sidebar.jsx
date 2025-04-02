import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const defaultGroupId = "67e286ba28bb7db0a9046ecf";
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
       
        <NavLink to="/groups" className="sidebar-option">
          <p>Groups</p>
        </NavLink>

        <NavLink to={`/groups/${defaultGroupId}`} className="sidebar-option">
  <p>Group Details</p>
</NavLink>

<NavLink to="/status" className="sidebar-option">
          <p>Group status</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
