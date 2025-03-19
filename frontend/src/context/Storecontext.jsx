import { createContext, useEffect, useState } from "react";
import { services_list } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const storeContext = createContext(null);

const StoreContextProvider =(props) =>{
   // use it when live const url = "https://mchama-backend.onrender.com";  // Base URL
   const url = "http://localhost:4000"
  const [token, setToken] = useState("");
  const[loan_data,setLoanData] = useState([]);
  const [list,setList] = useState([]);
  const fetchList = async () => {
    try {
        const response = await axios.get(`${url}/api/group/list`);
        if (response.data.success) {
            // Extract only groupId from the response data
            const groupIds = response.data.data.map(group => group._id); // Assuming `_id` is the groupId
            setList(groupIds); 
        } else {
            toast.error("⚠️ Failed to fetch group data.");
        }
    } catch (error) {
        toast.error("❌ Error fetching group list: " + (error.response?.data?.message || error.message));
    }
};

  useEffect(()=>{
    fetchList();

    if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
    }
  },[])
    const contextValue = {

        services_list,
        url,
        token,
        setToken,
        list
        


    }
    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}
export default StoreContextProvider;
