import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useAuthStore } from "../../store/useAuthStore.js";
import { BsGoogle } from "react-icons/bs";
import { VscGithubInverted } from "react-icons/vsc";

function Login() {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const { error, login, loginWithGoogle, loginWithGithub } = useAuthStore();

  const handleOnchange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e, loginData) => {
    e.preventDefault();
    try {
      await login(loginData);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

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
          <form
            className="loginForm"
            onSubmit={(e) => handleOnSubmit(e, loginData)}
          >
            <label>Username:</label>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={(e) => handleOnchange(e)}
              autoComplete="on"
            />
            <label>Password:</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => handleOnchange(e)}
              autoComplete="on"
            />
            <div className="loginBottomSection">
              <div className="rememberMe">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <span
                className="forgotPassword"
                onClick={() => navigate("/forgot-pass")}
              >
                Forgot Password
              </span>
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
              <div className="signInWithGoogle" onClick={loginWithGoogle}>
                <BsGoogle size={25} />
                <b>Google</b>
              </div>
              <div className="signInWithGithub" onClick={loginWithGithub}>
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
