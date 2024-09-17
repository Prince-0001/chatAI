import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext =createContext({
    
}
);

export const AuthContextProvider =({children})=>{
    const [currentUser, setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))||null);
    const [token,setToken]=useState("");

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const regex = new RegExp(`;\\s*${name}=([^;]*)`);
        const match = value.match(regex);
        return match && match[1];
      };
    
      
    const login =async(inputs)=>{
        
        const res=await axios.post(import.meta.env.VITE_API_URL+"/api/auth/login",inputs,{
            withCredentials:true,
        });
        const{password,...other}=res.data._doc;
        setCurrentUser(other);
    }

    const logout=async ()=>{
        await axios.post(import.meta.env.VITE_API_URL+"/api/auth/logout",{},{
            withCredentials:true,
        });
        setCurrentUser(null);
        localStorage.removeItem("user");
    }

    useEffect(()=>{
        setToken(getCookie("access_token"));
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser,token,login])
    
    


    return(
        <AuthContext.Provider value={{currentUser,login,logout,setCurrentUser,token}}>
            {children}
        </AuthContext.Provider>
    )
}