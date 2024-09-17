import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export const AuthContext =createContext({
    
}
);

export const AuthContextProvider =({children})=>{
    const [currentUser, setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))||null);
    const [token,setToken]=useState(null);
    const [loading,setLoading]=useState(true);
    
    const login =async(inputs)=>{
        
        const res=await axios.post(import.meta.env.VITE_API_URL+"/api/auth/login",inputs,{
            withCredentials:true,
        });
        const{password,...other}=res.data._doc;
        setCurrentUser(other);
        setToken(Cookies.get('access_token'))
        setLoading(false)
    }

    const logout=async ()=>{
        await axios.post(import.meta.env.VITE_API_URL+"/api/auth/logout",{},{
            withCredentials:true,
        });
        setCurrentUser(null);
        localStorage.removeItem("user");
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])

    return(
        <AuthContext.Provider value={{currentUser,login,logout,setCurrentUser,token,loading}}>
            {children}
        </AuthContext.Provider>
    )
}