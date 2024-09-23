import React from "react";
import "./dashboard.css";
import { useAuthStore } from "../../store/useAuthStore.js";
import moment from "moment";

function Dashboard() {
  const { logout, user, oAuthLogout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    await oAuthLogout();
  };

  return (
    <div className="dashboardContainer">
      <div className="dashboardSection">
        <div className="dashboardFilter">
          <h1>Welcome To your dashoard</h1>
          <div className="subContainer">
            <div>
              <span>Username:</span>
              <b>{user.username}</b>
            </div>
            <div>
              <span>Email:</span>
              <b>{user.email}</b>
            </div>
            <div>
              <span>isVerified:</span>
              <b>{String(user.isVerified)}</b>
            </div>
            <div>
              <span>LastLogin:</span>
              <b>{moment(user.lastLogin).fromNow()}</b>
            </div>
            <div>
              <span>Created At:</span>
              <b>{moment(user.createdAt).calendar()}</b>
            </div>
          </div>
          <button className="logoutBtn" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
