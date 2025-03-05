import React from "react";
import { doSignOut } from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import "./DashboardScreen.css";

const Dashboard = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!userLoggedIn) {
    navigate("/");
    return null;
  }

  const handleLogout = async () => {
    await doSignOut();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2>Welcome, {currentUser?.email}!</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
