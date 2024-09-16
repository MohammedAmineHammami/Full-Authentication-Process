import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/google-logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>logoOut</button>
    </div>
  );
}

export default Dashboard;
