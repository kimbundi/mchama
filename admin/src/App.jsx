import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Loanrequest from "./pages/requests/Loanrequest";
import Given from "./pages/given/Given";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Groups from "./pages/mchamagroups/Groups";
import GroupStatus from "./pages/approved/Groupstatus";
import GroupDetails from "./pages/mchama/Members";


const isAuthenticated = () => localStorage.getItem("adminToken") !== null;

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Routes Wrapped Inside Dashboard Layout */}
        <Route path="/" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}>
          <Route path="dashboard" element={<List />} /> {/* Default content inside Dashboard */}
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          
          <Route path="groups/:groupId" element={<GroupDetails />} />
          <Route path="requests" element={<Loanrequest />} />
          <Route path="given" element={<Given />} />
          <Route path="groups" element={<Groups />} />
          <Route path="status" element={<GroupStatus />} />
          <Route index element={<Navigate to="/dashboard" />} /> {/* Default redirect */}
        </Route>

        {/* Redirect Unknown Routes */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;
