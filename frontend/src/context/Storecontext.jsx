import { createContext, useEffect, useState } from "react";
import { services_list } from "../assets/assets";

export const storeContext = createContext(null);

const StoreContextProvider =(props) =>{
    const url = "http://localhost:4000";  // Base URL
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