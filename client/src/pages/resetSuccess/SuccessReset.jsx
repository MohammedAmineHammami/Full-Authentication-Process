import React from "react";
import "./successReset.css";
import { MdArrowCircleLeft } from "react-icons/md";
function SuccessReset() {
  return (
    <div className="successPassResetContainer">
      <div className="successPassResetSection">
        <div className="successPassResetHeader">
          <b>Password Reset</b>
          <span>Your Password has been successfully reset.</span>
          <span>Click below to login magically.</span>
        </div>
        <div className="successPassResetContinue">
          <span>Continue</span>
        </div>
        <div className="successPassResetGoBack">
          <MdArrowCircleLeft className="goBackIcon" />
          <span>Back to login</span>
        </div>
      </div>
    </div>
  );
}

export default SuccessReset;
