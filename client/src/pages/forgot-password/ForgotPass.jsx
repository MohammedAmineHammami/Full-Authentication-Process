import React from "react";
import "./forgotPass.css";
import { MdArrowCircleLeft } from "react-icons/md";
function ForgotPass() {
  return (
    <div className="forgetPassContainer">
      <div className="forgetPassSection">
        <div className="forgetPassHeader">
          <b>Forgot Password?</b>
          <span>No worries,we'll send you reset instructions.</span>
        </div>
        <form className="forgetPassForm">
          <label>Email:</label>
          <input type="email" placeholder="Enter your email here" />
          <button>Send</button>
        </form>
        <div className="forgetPassGoBack">
          <MdArrowCircleLeft className="goBackIcon" />
          <span>Back to login</span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
