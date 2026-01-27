import React, { useEffect } from "react";
import LoginBackground from "../assets/icons/login.svg";
import SignupBackground from "../assets/icons/sign-up.svg";
import ForgotBackground from "../assets/icons/forgot-password.svg";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/authPages/Login";

import { useSelector } from "react-redux";
import PageNotFound from "../components/PageNotFound";

const AuthRouting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const currentPath = location.pathname;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const backgroundImages = {
    "/": LoginBackground,
    "/Signup": SignupBackground,
    "/ForgotPassword": ForgotBackground,
  };

  return (
    <div className="row login-container-row">
      <div className="col-md-5 no-padding login-background">
        <Routes>
          <Route exact path="/" element={<Login />} />
          {/* <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/ForgotPassword" element={<ForgotPassword />} /> */}
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <div className="col-md-7 no-padding login-right-box">
        <div className="login-right-container">
          <img
            src={backgroundImages[currentPath]}
            alt="Background image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthRouting;
