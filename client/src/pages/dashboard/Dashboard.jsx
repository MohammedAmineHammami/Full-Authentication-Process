import React from "react";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboardContainer">
      <div className="dashboardSection">
        <div className="dashboardFilter">
          <h1>Welcome To your dashoard</h1>
          <div className="subContainer">
            <div>
              <span>Username:</span>
              <b>Mohamed Amine Hammami</b>
            </div>
            <div>
              <span>Email:</span>
              <b>mohamedaminehammami1994@gmail.com</b>
            </div>
            <div>
              <span>Status:</span>
              <b>Verified</b>
            </div>
            <div>
              <span>LastLogin:</span>
              <b>{new Date().getHours}</b>
            </div>
            <div>
              <span>Created At:</span>
              <b>{new Date().getFullYear()}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
