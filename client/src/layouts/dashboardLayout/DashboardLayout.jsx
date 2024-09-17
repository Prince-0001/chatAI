import React, { useEffect } from 'react'
import './dashboardLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
// import { useAuth } from '@clerk/clerk-react'
import ChatList from '../../components/chatList/ChatList'
import './dashboardLayout.css'
import Cookies from 'js-cookie';
import { useContext } from 'react'

const DashboardLayout = () => {
  
  const navigate=useNavigate();
  // const{userId, isLoaded}=useAuth();
  // useEffect(()=>{
  //   if(isLoaded && !userId){
  //     navigate("/sign-in");
  //   }
  // },[userId,isLoaded,navigate])

  
const{loading} =useContext(AuthContext);


useEffect(()=>{
  if(loading){
    navigate("/login")
  }
},[loading])

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const tokenFromCookie = Cookies.get('access_token');
  //     if (!tokenFromCookie || tokenFromCookie === '') {
  //       navigate("/login");
  //     }
  //   }, 60000);

    


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
