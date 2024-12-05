import React, { useState } from "react";

import "./RegisterPage.css";

function RegisterPage() {
  //insert code here to create useState hook variables for firstName, lastName, email, password
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");


  // insert code here to create handleRegister function and include console.log

  const validateEmail = (param)=>{
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   return emailRegex.test(param);
  }

  const handleRegister = async () => {
    console.log("Register invoked");
    if(firstName === '' || lastName === '' || email === '' || password === ''){
      seterrorMsg('All fields are mandatory')
    }else{
      seterrorMsg('')
      if(email){
         if(validateEmail(email)){
            seterrorMsg('')
         }else{
            seterrorMsg('Enter a valid email for example: sample@sampledomain.com')
         }
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
            {errorMsg && <p style={{color:'red'}}>{errorMsg}</p>}
            <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>

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