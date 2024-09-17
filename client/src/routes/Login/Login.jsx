import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



const Login = () => {

  const navigate=useNavigate();

  const [data,setData]=useState({
    email:"",
    password:"",
  });

  const [error,setError]=useState("");
  
  const handleEvent=(e)=>{
    setData(prev=>({...prev,[e.target.name]:e.target.value}))
    setError("");
  }

  const {login}=useContext(AuthContext);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await login(data);
      navigate('/dashboard');

    }
    catch(err){
      console.log(err);
      setError(err.response.data);
    }
    
  }
  return (
    <div className="container">
      <div className="login">
        <h1>Login</h1>
        <div className="terms">
          <p>By signing in you are agreeing </p>
          <span>our Term and privacy policy</span>
        </div>
        <div className="buttons">
          <button className="btn active">Login</button>
          <Link to='/register'>
          <button className="btn">Register</button></Link>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" id="email" placeholder="Email Address" onChange={handleEvent}/>
            <input type="password" name="password" id="password" placeholder="Password" onChange={handleEvent} />
            {(error!=="")?<p>{error}</p>:null}
            <div className="forgot-box">
              <div className="remember">
                <input type="checkbox" name="" id="remember-password" />
                <label htmlFor="remember-password">Remember password</label>
              </div>
              <p>Forgot password</p>
            </div>
            <button type="submit" id="btn">
              Login
            </button>
          </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default Login;
