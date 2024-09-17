import React, { useEffect } from 'react'
import './dashboardLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'
// import { useAuth } from '@clerk/clerk-react'
import ChatList from '../../components/chatList/ChatList'
import './dashboardLayout.css'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { useState } from 'react'

const DashboardLayout = () => {
  
  const navigate=useNavigate();
  // const{userId, isLoaded}=useAuth();
  // useEffect(()=>{
  //   if(isLoaded && !userId){
  //     navigate("/sign-in");
  //   }
  // },[userId,isLoaded,navigate])

  const {currentUser,token}=useContext(AuthContext);
  // useEffect(()=>{
  //   if(!token||!currentUser){
  //   navigate('/login');
  //   }
  // },[currentUser,token])
  

  return (
    <div className='dashboardLayout'>
      <div className="menu"><ChatList/></div>
      <div className="content">
        <Outlet/>
      </div>
      
    </div>
  )
}

export default DashboardLayout
