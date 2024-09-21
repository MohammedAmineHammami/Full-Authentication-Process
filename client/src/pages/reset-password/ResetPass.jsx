import React from "react";
import "./resetPass.css";
import { MdArrowCircleLeft } from "react-icons/md";
function ResetPass() {
  return (
    <div className="resetPassContainer">
      <div className="resetPassSection">
        <div className="resetPassHeader">
          <b>Reset Password?</b>
          <span>
            Your new password must be different then the previously used.
          </span>
        </div>
        <form className="resetPassForm">
          <label>New Password:</label>
          <input type="password" placeholder="New password" />
          <label>Confirm Password:</label>
          <input type="password" placeholder="New password" />
          <button>Reset Password</button>
        </form>
        <div className="resetPassGoBack">
          <MdArrowCircleLeft className="goBackIcon" />
          <span>Back to login</span>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
