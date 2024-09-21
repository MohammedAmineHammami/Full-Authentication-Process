import React from "react";
import "./verifyAccount.css";
import VerificationCodeInput from "../../components/VerificationCodeInput";
function VerifyAccount() {
  return (
    <div className="verifyAccountContainer">
      <div className="verificationSectionDiv">
        <div className="verificationHeader">
          <b>Verify Your Account</b>
          <p>
            We emailed you the six digit code to example@gmail.com Enter the
            code below to confirm your email address
          </p>
        </div>
        <div className="codeContainer">
          {[...Array(6)].map((el, i) => {
            return <VerificationCodeInput key={i} />;
          })}
        </div>
        <button className="verifyBtn">Verify</button>
        <div>
          <span className="resendMsg">if you didn't recieve the code!! </span>
          <span className="resendBtn">RESEND</span>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
