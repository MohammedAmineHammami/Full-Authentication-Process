import React, { useState } from "react";
import "./forgotPass.css";
import { MdArrowCircleLeft } from "react-icons/md";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
function ForgotPass() {
  const [email, setEmail] = useState("");
  console.log(email);
  const navigte = useNavigate();
  const { forgotPass, message } = useAuthStore();
  const handleForgotPass = async (email) => {
    try {
      await forgotPass(email);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="forgetPassContainer">
      <div className="forgetPassSection">
        <div className="forgetPassHeader">
          <b>Forgot Password?</b>
          <span>No worries,we'll send you reset instructions.</span>
        </div>
        <form
          className="forgetPassForm"
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPass(email);
          }}
        >
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email here"
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Send</button>
        </form>
        {message ? <b className="forgotMsg">{message}</b> : null}
        <div className="forgetPassGoBack" onClick={() => navigte("/login")}>
          <MdArrowCircleLeft className="goBackIconf" />
          <span>Back to login</span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
