import React, { useState } from "react";
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import "./RegisterPage.css";

function RegisterPage() {
  //insert code here to create useState hook variables for firstName, lastName, email, password
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [showerr, setShowerr] = useState('');

  // insert code here to create handleRegister function and include console.log

  const navigate = useNavigate();
  const NodeURL = urlConfig.backendUrl;
  const { setIsLoggedIn } = useAppContext();

  const validateEmail = (param) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(param);
  };

  const handleRegister = async () => {
    console.log("Register invoked");
    if(firstName === "" || lastName === "" || email === "" || password === "") {
        seterrorMsg("All fields are mandatory");
    } else if (email && !validateEmail(email)) {
      seterrorMsg("Enter a valid email for example: sample@sampledomain.com");
    } else {
      seterrorMsg("");
    }
    if (errorMsg === "") {
      console.log('NodeURL',NodeURL)
      const response = await fetch(`${NodeURL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
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
          sessionStorage.setItem('name', firstName);
          sessionStorage.setItem('email', json.email);
          setIsLoggedIn(true);
          navigate('/app');
      }
      if (json.error) {
            setShowerr(json.error);
        }
    }
  };



  return (
    <div className="container mt-8">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-12">
          <div className="register-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Register</h2>

            {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
            <div className="mb-4">
              <label htmlFor="firstName" className="form label">
                {" "}
                FirstName
              </label>
              <br />
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="Enter your firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="form label">
                {" "}
                lastName
              </label>
              <br />
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Enter your lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form label">
                {" "}
                email
              </label>
              <br />
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form label">
                {" "}
                password
              </label>
              <br />
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            {showerr && <p style={{ color: "red" }}>{showerr}</p>}
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleRegister}
            >
              Register
            </button>

            {/* insert code here to create a button that performs the `handleRegister` function on click */}
            <p className="mt-4 text-center">
              Already a member?{" "}
              <a href="/app/login" className="text-primary">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  ); //end of return
}

export default RegisterPage;
