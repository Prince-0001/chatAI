import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate=useNavigate();

  const [data,setData]=useState({
    username:"",
    email:"",
    password:"",
  });

  const [error,setError]=useState("");
  console.log(data);
  
  const handleEvent=(e)=>{
    setData(prev=>({...prev,[e.target.name]:e.target.value}))
    setError("");
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post(import.meta.env.VITE_API_URL+'/api/auth/register',data,{
        withCredentials:true,
      })
      navigate('/login');

    }
    catch(err){
      console.log(err);
      setError(err.response.data);
    }
  }

  return (
    <div className="container">
      <div className="register">
        <h1>Register</h1>
        <div className="terms">
          <p>By signing in you are agreeing </p>
          <span>our Term and privacy policy</span>
        </div>
        <div className="buttons">
          <Link to='/login'>
          <button className="btn ">Login</button>
          </Link>
          
          <button className="btn active">Register</button>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" placeholder="username" onChange={handleEvent} />
            <input type="email" name="email" id="email" placeholder="Email Address" onChange={handleEvent} />
            <input type="password" name="password" id="" placeholder="Password" onChange={handleEvent}/>
            {(error!=="")?<p>{error}</p>:null}
            <div className="forgot-box">
              <div className="remember">
                <input type="checkbox" name="" id="remember-password" />
                <label htmlFor="remember-password">Remember password</label>
              </div>
              <p>Forgot password</p>
            </div>
            <button type="submit" id="btn">
              Register
            </button>
          </form>
          <div className="others">
            <p>or Connect with</p>
            <div className="icons">
              <img  src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new"/>
              <img width="48" height="48" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="instagram-new--v1"/>          <img width="48" height="48" src="https://img.icons8.com/color/48/pinterest--v1.png" alt="pinterest--v1"/>
              <img  src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin"/>
            </div>
            <div className="fingerprint">
              <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/fingerprint.png" alt="fingerprint"/>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
