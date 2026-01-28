import React from "react";
import LoginBackground from "../assets/icons/login.svg";
import SignupBackground from "../assets/icons/login-bg.svg";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/authPages/Login";
import Signup from "../pages/authPages/Signup";



const AuthRouting = () => {

  const location = useLocation();

  const currentPath = location.pathname;



  const backgroundImages = {
    "/": LoginBackground,
    "/signup": SignupBackground,
  };

  return (
    <div className="row auth-container-row">
      <div className="col-md-6 nopadding">
        <div className=" auth-left-container">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
      </div>
      <div className="col-md-6 nopadding ">
        <div className="auth-right-container">
          <img
            src={backgroundImages[currentPath]}
            alt="Background image"
            loading="lazy"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthRouting;
