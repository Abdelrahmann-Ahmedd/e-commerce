import { createContext, useEffect, useState } from "react"


export const authContext = createContext();



export function AuthContextProvider( {children} ) {

    const [token , setToken] = useState(null);
    useEffect(  ()=>{
        const val = localStorage.getItem("token");
        if(val !=null) {
            setToken(val);
        }
    },[]) 

    return <authContext.Provider value={ { myToken: token , setToken } }>
        { children }
    </authContext.Provider>
}