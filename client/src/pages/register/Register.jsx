import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useAuthStore } from "../../store/useAuthStore.js";
import { BsGoogle } from "react-icons/bs";
import { VscGithubInverted } from "react-icons/vsc";

function Register() {
  const [registerData, setRegisterData] = useState({});
  const navigate = useNavigate();
  const { error, register } = useAuthStore();

  const handleRegisterOnchange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const submitRegisterData = async (e) => {
    e.preventDefault();
    try {
      await register(registerData);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="registerPageContainer">
      <div className="registerSection">
        <div className="registerLeftSide">
          <div className="registerLeftSideheader">
            <b className="registerTitle">GET START NOW</b>
            <span className="registerSubTitle">
              enter your credentials to access your account!
            </span>
          </div>
          <form
            className="registerForm"
            onSubmit={(e) => submitRegisterData(e)}
            method="post"
          >
            <label>Username:</label>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={(e) => handleRegisterOnchange(e)}
              autoComplete="on"
            />
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => handleRegisterOnchange(e)}
              autoComplete="on"
            />
            <label>Password:</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => handleRegisterOnchange(e)}
              autoComplete="on"
            />
            <div className="registerBottomSection">
              <div className="rememberMe">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <span className="forgotPassword">Forgot Password</span>
            </div>
            {error ? (
              <div className="errorSection">
                <span>{error}</span>
              </div>
            ) : null}
            <button type="submit" className="signInBtn">
              Register
            </button>

            <div className="registerOrSignInWith">
              <hr />
              <div className="or">
                <b>Or</b>
              </div>
            </div>

            <div className="oauthBtns">
              <div className="signUpWithGoogle">
                <BsGoogle size={25} />
                <b>Google</b>
              </div>
              <div className="signUpWithGithub">
                <VscGithubInverted size={25} />
                <b>Github</b>
              </div>
            </div>
          </form>
          <b className="registerRedirectMsg">
            You have an account? <span></span>
          </b>
          <Link to="/login" className="redirectToLogin">
            Sign In here
          </Link>
        </div>
        <div className="registerRightSide"></div>
      </div>
    </div>
  );
}

export default Register;
