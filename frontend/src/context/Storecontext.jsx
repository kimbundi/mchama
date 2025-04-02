import { createContext, useEffect, useState } from "react";
import { services_list } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  // use it when live const url = "https://mchama-backend.onrender.com";  // Base URL
  const url = "http://localhost:4000";
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [loanData, setLoanData] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [list, setList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Track current user info

  // Fetch user-related data
  const fetchList = async () => {
    if (!token) return; // Don't fetch group data if no token

    try {
      const response = await axios.get(`${url}/api/group/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Extract the group ID correctly
        const groupId = response.data.group._id; // Access `_id` directly
        setList([groupId]); // Store it as an array with one element
      } else {
        toast.error("⚠️ Failed to fetch group data.");
      }
    } catch (error) {
      toast.error("❌ Error fetching group list: " + (error.response?.data?.message || error.message));
    }
  };

  // Store token and currentUser in localStorage when setToken is called
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("currentUser");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser)); // Assume user data is saved in localStorage
    }
  }, []);

  // Fetch group list whenever token changes
  useEffect(() => {
    if (token) {
      fetchList(); // Fetch list only if the token exists
    }
  }, [token]);

  // Log out functionality: Clear token, list, and currentUser
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setToken("");
    setCurrentUser(null);
    setList([]);
    toast.info("You have logged out.");

    navigate("/");
  };

  const contextValue = {
    services_list,
    url,
    token,
    setToken,
    list,
    setList,
    currentUser,
    setCurrentUser,
    logout, // Provide logout function
    loanData,
    setLoanData,
    showLogin,
    setShowLogin,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
