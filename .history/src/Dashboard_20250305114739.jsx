import React from "react";
import { doSignOut } from "./firebase/auth.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/index.jsx";

const Dashboard = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!userLoggedIn) {
    navigate("/"); // Redirect if not logged in
    return null;
  }

  const handleLogout = async () => {
    await doSignOut();
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome, {currentUser?.email}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
