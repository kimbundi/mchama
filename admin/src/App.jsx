import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Loanrequest from "./pages/requests/Loanrequest";
import Given from "./pages/given/Given";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to check if admin is logged in
const isAuthenticated = () => localStorage.getItem("adminToken") !== null;

const App = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}>
        <Route path="add" element={<Add />} />
        <Route path="list" element={<List />} />
        <Route path="requests" element={<Loanrequest />} />
        <Route path="given" element={<Given />} />
        <Route index element={<List />} /> {/* Default Page */}
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} />} />
    </Routes>
    </>
  );
};

export default App;
