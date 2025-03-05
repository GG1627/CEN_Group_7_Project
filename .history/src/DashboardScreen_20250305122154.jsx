import React from "react";
import { doSignOut } from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

const dashboardStyle = {
  minHeight: "100vh",
  backgroundColor: "#f0e6ff", // light purple background
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
};

const contentStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const logoutButton = {
  backgroundColor: "#6b46c1",
  color: "white",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "1rem",
};

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
    <div style={dashboardStyle}>
      <div style={contentStyle}>
        <h2>Welcome, {currentUser?.email}!</h2>
        <button style={logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
