import React from "react";
import "./successReset.css";
import { MdArrowCircleLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function SuccessReset() {
  const navigate = useNavigate();
  return (
    <div className="successPassResetContainer">
      <div className="successPassResetSection">
        <div className="successPassResetHeader">
          <b>Password Reset</b>
          <span>Your Password has been successfully reset.</span>
          <span>Click below to login magically.</span>
        </div>
        <div
          className="successPassResetContinue"
          onClick={() => navigate("/login")}
        >
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
