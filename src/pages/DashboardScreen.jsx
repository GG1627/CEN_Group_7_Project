import React, { useEffect } from "react";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import "../css/DashboardScreen.css";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

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

  const emailUsername = currentUser?.email.split("@")[0];

  return (
    <div>
      <NavBar />
      <div className="dashboard-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>

        <div className="top-section">
          {/* <h1 className="dashboard-title">CarCost Dashboard</h1> */}
        </div>

        <div className="main-content">
          <motion.div
            className="welcome-section"
            initial={{ x: -1000 }} // Start off-screen to the left
            animate={{ x: 0 }} // Animate to original position
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 4,
            }}
          >
            <h2 className="welcome-text">
              Welcome back,
              <br />
              <span className="username-text">{emailUsername}!</span>
            </h2>
          </motion.div>

          <div className="info-section">
            <p className="info-text">
              Explore our extensive database featuring over 10,000 vehicles. Get
              comprehensive information about car prices, specifications, and
              much more. Make informed decisions with our reliable data and
              user-friendly tools.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <h3 className="cta-text">Ready to start searching?</h3>
          <button className="search-button" onClick={() => navigate("/home")}>
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
