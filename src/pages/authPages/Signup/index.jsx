import React from "react";
import KnowledgeLogo from "../../../assets/icons/knowledgebase-logo.svg";
import EmailIcon from "../../../assets/icons/email.svg";
import LoginArrow from "../../../assets/icons/login-btn.svg";
import InputField from "../../../components/InputField";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
   const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-info-container">
        <img src={KnowledgeLogo} className="login-logo" alt="logo" />
        <div className="login-heading">
          <p>Where files become</p>
          <span>shared knowledge.</span>
        </div>

        <p className="login-desc">
          Securely upload, organize, and access important information all in one
          trusted place.
        </p>
      </div>

      <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
        <div className="login-input-contaner">
          <InputField
            heading={"Email Address"}
            placeholder={"amjad.alikhan@gmail.com"}
            showIcon={true}
            rightIcon={EmailIcon}
            type="email"
          />
          <InputField
            heading={"Your Password"}
            placeholder={"••••••••••••"}
            showIcon={true}
            passwordIcon={true}
          />

          <div className="remember-container">
            <div className="remember-checkBox-container">
              <input type="checkbox" id="remember" defaultChecked />
              <label htmlFor="remember">Remember Password</label>
            </div>
            <div className="forgot-password">
              <Link to="/ForgotPassword">Forgot Password?</Link>
            </div>
          </div>
        </div>

        <div className="login-btn-container">
          <button type="submit" onClick={() => navigate("/")}>
            <img src={LoginArrow} alt="icon" />
            Login
          </button>

          <div className="dont-have">
            <p>
              Can't remember your password?
              <Link to="/signup"> Reset password</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
