import { createContext, useEffect, useState } from "react";
import { services_list } from "../assets/assets";

export const storeContext = createContext(null);

const StoreContextProvider =(props) =>{
    const url = "https://mchama-backend.onrender.com/";  // Base URL
  const [token, setToken] = useState("");
  const[loan_data,setLoanData] = useState([]);
  

  useEffect(()=>{

    if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
    }
  },[])
    const contextValue = {

        services_list,
        url,
        token,
        setToken


    }
    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}
export default StoreContextProvider;
