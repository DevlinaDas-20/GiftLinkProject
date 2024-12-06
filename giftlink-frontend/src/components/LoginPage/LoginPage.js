import React, { useState } from "react";
import "./LoginPage.css";
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  //insert code here to create useState hook variables for email, password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const navigate = useNavigate();
  const NodeURL = urlConfig.backendUrl;
  const { setIsLoggedIn } = useAppContext();



  // insert code here to create handleLogin function and include console.log
  const validateEmail = (param)=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(param);
    }

  const handleLogin = async () => {
    console.log("Inside handleLogin");
    seterrorMsg("");
    if(email === '' || password === ''){
        seterrorMsg('All fields are mandatory')
    } else if (email && !validateEmail(email)) {
      seterrorMsg("Enter a valid email for example: sample@sampledomain.com");
    } else {
      seterrorMsg("");
    }
    if (errorMsg === "") {
      console.log('NodeURL',NodeURL);
      const response = await fetch(`${NodeURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      console.log('response',response);
      const json = await response.json();
      console.log('json data', json);
      console.log('er', json.error);
      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', json.userName);
        sessionStorage.setItem('email', json.userEmail);
        setIsLoggedIn(true);
        navigate('/app');
      }else{
        seterrorMsg(`${json.error}`)
      }
    }
  };

  return (
    <div className="container mt-8">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-12">
          <div className="login-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Login</h2>

            {/* insert code here to create input elements for the variables email and  password */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {setEmail(e.target.value);seterrorMsg("")}}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {setPassword(e.target.value);seterrorMsg("")}}
              />
            </div>

            {/* insert code here to create a button that performs the `handleLogin` function on click */}
            {errorMsg && <p style={{color:'red'}}>{errorMsg}</p>}

            <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>

            <p className="mt-4 text-center">
              New here?{" "}
              <a href="/app/register" className="text-primary">
                Register Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
