import React from "react";
import "./resetPass.css";

function ResetPass() {
  return (
    <div className="resetPassContainer">
      <div className="resetPassSection">
        <div className="resetPassHeader">
          <b>Forgot Password?</b>
          <span>No worries,we'll send you reset instructions.</span>
        </div>
        <form className="resetBtn">
          <label>Email:</label>
          <button>Send</button>
        </form>
        <div className="resetGoBack">
          <span>Back to login</span>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
