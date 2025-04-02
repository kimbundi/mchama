import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'
import { toast } from 'react-toastify';



const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mchama-backend.onrender.com/api/user/login", {

        phonenumber: phoneNumber, // Using phone number instead of email
        password,
      });

      const { token } = response.data;
      localStorage.setItem("adminToken", token); // Store token securely
      toast.success(response.data.message || "login successful")
      
      navigate("/dashboard"); // Redirect to admin dashboard
    } catch (err) {
      setError("Invalid credentials. Try again.");
      toast.error(response.data.message || "invalid credentials")
    }
  };

  return (
    <div className="admin-login-container">
    <div className="admin-login-box">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
            <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    </div>
</div>
  );
};

export default AdminLogin;
