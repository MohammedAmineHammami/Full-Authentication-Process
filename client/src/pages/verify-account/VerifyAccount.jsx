import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./verifyAccount.css";
import VerificationCodeInput from "../../components/VerificationCodeInput";
import { useAuthStore } from "../../store/useAuthStore";
function VerifyAccount() {
  const [code, setCode] = useState([]);

  const { user, verifyAccount, error } = useAuthStore();

  const handleVerification = async (code) => {
    try {
      await verifyAccount(code.join(""));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="verifyAccountContainer">
      <div className="verificationSectionDiv">
        <div className="verificationHeader">
          <b>Verify Your Account</b>
          <p>
            We emailed you the six digit code to
            <span className="email"> {user?.email}</span>
            enter the code below to confirm your email address
          </p>
        </div>
        <div className="codeContainer">
          {[...Array(6)].map((el, i) => {
            return (
              <VerificationCodeInput
                id={i}
                key={i}
                codeSetter={setCode}
                verificationCode={code}
              />
            );
          })}
        </div>
        <button className="verifyBtn" onClick={() => handleVerification(code)}>
          Verify
        </button>
        {error ? <div className="errorSection">{error}</div> : null}
        <div>
          <span className="resendMsg">if you didn't recieve the code!! </span>
          <span className="resendBtn" onClick={() => handleVerification(code)}>
            RESEND
          </span>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
