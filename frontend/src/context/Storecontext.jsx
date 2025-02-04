import { createContext } from "react";
import { services_list } from "../assets/assets";

export const storeContext = createContext(null);

const StoreContextProvider =(props) =>{
    const contextValue = {

        services_list


    }
    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}
export default StoreContextProvider;