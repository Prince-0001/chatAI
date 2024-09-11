import React, { useEffect } from 'react'
import './dashboardLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import ChatList from '../../components/chatList/ChatList'
import './dashboardLayout.css'

const DashboardLayout = () => {
  const{userId, isLoaded}=useAuth();

  const navigate=useNavigate();

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/sign-in");
    }
  },[userId,isLoaded,navigate])
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
