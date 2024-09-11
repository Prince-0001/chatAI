import React, { useState } from 'react'
import './homepage.css'
import { Link } from 'react-router-dom'
import backgroundImg from './orbital.png'
import botImg from './bot.png'
import human1 from './human1.jpg'
import human2 from './human2.jpg'
import logo from '../../layouts/rootlayout/Picture.png'
import {TypeAnimation} from 'react-type-animation'
const homepage = () => {
  const [typingStatus,setTypingStatus]=useState("human1")
  return (
    <div className='homePage'>
      <img src={backgroundImg} alt="" className='orbital'/>
      <div className="left">
        <h1>PRINCE AI</h1>
        <h2>SuperCharge your creativity and productivity </h2>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, nobis Lorem ipsum dolor sit amet consectetur.
        </h3>
        <Link to="dashboard">
          Get Started
        </Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
              <div className="bg">
              
              </div>
            
          </div>
          <img src={botImg} className='bot'/>
          <div className="chat">
            <img src={typingStatus==="human1"
            ?human1
            :typingStatus=="human2"
            ?human2
            :botImg} alt=""/>
            <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Human1:We produce food for Mice',
        2000, ()=> {setTypingStatus("bot")}
        ,
        'Bot:We produce food for Hamsters',
        2000,()=> {setTypingStatus("human2")}
        ,
        'Human2:We produce food for Guinea Pigs',
        2000,()=> {setTypingStatus("bot")}
        ,
        'Bot:We produce food for Chinchillas',
        2000,()=> {setTypingStatus("human1")}
      ]}
      wrapper="span"
      repeat={Infinity}
      cursor={true}
      omitDeletionAnimation={true}
    />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src={logo} alt="" />
        <div className="links">
          <Link to='/'>Terms of Services</Link>
          <span>|</span>
          <Link to='/'>Privacy Policy</Link>
        </div>
      </div>
       
    </div>
  )
}

export default homepage
