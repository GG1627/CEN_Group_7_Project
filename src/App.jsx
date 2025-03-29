import "./App.css";
import React from "react";
import Login from "./LoginScreen.jsx";
import Signup from "./SignupScreen.jsx";
import Dashboard from "./DashboardScreen.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/index.jsx";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
