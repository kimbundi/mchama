import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="outlet-container">
          <Outlet /> {/* This renders List, Requests, etc. */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
