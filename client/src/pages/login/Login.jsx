import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useAuthStore } from "../../store/useAuthStore.js";
import { BsGoogle } from "react-icons/bs";
import { VscGithubInverted } from "react-icons/vsc";

function Login() {
  const { error } = useAuthStore();
  return (
    <div className="loginPageContainer">
      <div className="loginSection">
        <div className="loginLeftSide">
          <div className="loginLeftSideheader">
            <b className="loginTitle">WELCOME BACK</b>
            <p className="loginSubTitle">
              welcome back! Please enter your details.
            </p>
          </div>
          <form className="loginForm">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" />
            <label>Password:</label>
            <input type="password" placeholder="password" />
            <div className="loginBottomSection">
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
              Sign in
            </button>
            <div className="orSignInWith">
              <hr />
              <div className="or">
                <b>Or</b>
              </div>
            </div>

            <div className="oauthBtns">
              <div className="signInWithGoogle">
                <BsGoogle size={25} />
                <b>Google</b>
              </div>
              <div className="signInWithGithub">
                <VscGithubInverted size={25} />
                <b>Github</b>
              </div>
            </div>
          </form>
          <b className="loginRedirectMsg">
            Don't have an account? <span></span>
          </b>
          <Link to={"/register"} className="redirectToRegister">
            Sign up for free
          </Link>
        </div>
        <div className="loginRightSide"></div>
      </div>
    </div>
  );
}

export default Login;
