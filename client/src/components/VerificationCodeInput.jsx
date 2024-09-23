import React from "react";
import "../pages/verify-account/verifyAccount.css";
function VerificationCodeInput({ codeSetter, verificationCode, id }) {
  const handleOnchange = (e) => {
    const currentValue = e.target.value;
    const currentId = Number.parseInt(e.target.id);
    const isValid = /^[0-9]$/.test(currentValue);
    if (isValid) {
      codeSetter([...verificationCode, currentValue]);
      if (id < 5) {
        document.getElementById(`${currentId + 1}`).focus();
      }
    } else {
      e.target.value = null;
    }
  };

  return (
    <div className="singleInputContenair">
      <input
        className="singleInput"
        onChange={(e) => handleOnchange(e)}
        type="text"
        maxLength={"1"}
        id={id}
      />
    </div>
  );
}

export default VerificationCodeInput;
