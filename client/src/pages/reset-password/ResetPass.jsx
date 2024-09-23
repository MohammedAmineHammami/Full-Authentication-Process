import React, { useState } from "react";
import "./resetPass.css";
import { MdArrowCircleLeft } from "react-icons/md";
import { useAuthStore } from "../../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
function ResetPass() {
  const [resetData, setResetData] = useState({});
  const navigate = useNavigate();
  const { resetPass, error } = useAuthStore();
  const { pathname } = useLocation();
  const token = pathname.split("/")[2];
  console.log(token);
  const handleResetOnchange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };
  const handleResetPass = async (resetData, token) => {
    try {
      await resetPass(resetData, token);
      navigate("/success-pass-reset");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="resetPassContainer">
      <div className="resetPassSection">
        <div className="resetPassHeader">
          <b>Reset Password?</b>
          <span>
            Your new password must be different then the previously used.
          </span>
        </div>
        <form
          className="resetPassForm"
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPass(resetData, token);
          }}
        >
          <label>New Password:</label>
          <input
            type="password"
            placeholder="New password"
            name="newPass"
            autoComplete="on"
            onChange={(e) => handleResetOnchange(e)}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="New password"
            name="confirmPass"
            autoComplete="on"
            onChange={(e) => handleResetOnchange(e)}
          />
          <button>Reset Password</button>
        </form>
        {error ? <b className="forgotMsg">{error}</b> : null}
        <div className="resetPassGoBack" onClick={() => navigate("/login")}>
          <MdArrowCircleLeft className="goBackIconf" />
          <span>Back to login</span>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
