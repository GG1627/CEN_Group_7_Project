import React, { useEffect } from "react";
import { doSignOut } from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import "./DashboardScreen.css";

const Dashboard = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  const handleLogout = async () => {
    await doSignOut();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">CarCost Dashboard</h1>
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
