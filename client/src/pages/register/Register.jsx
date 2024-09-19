import React from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { useAuthStore } from "../../store/useAuthStore.js";
import { BsGoogle } from "react-icons/bs";
import { VscGithubInverted } from "react-icons/vsc";

function Register() {
  const { error } = useAuthStore();
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
          <form className="registerForm">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" />
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" />
            <label>Password:</label>
            <input type="password" placeholder="password" />
            <div className="registerBottomSection">
              <div className="rememberMe">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <span className="forgotPassword">Forgot Password</span>
            </div>
            {false ? (
              <div className="errorSection">
                <span>{error}</span>
              </div>
            ) : null}
            <button type="submit" className="signInBtn">
              Sign in
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
          <Link className="redirectToLogin">Sign In here</Link>
        </div>
        <div className="registerRightSide"></div>
      </div>
    </div>
  );
}

export default Register;
