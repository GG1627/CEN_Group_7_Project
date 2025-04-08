import "./App.css";
import React from "react";
import Login from "./LoginScreen.jsx";
import Signup from "./SignupScreen.jsx";
import Dashboard from "./DashboardScreen.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/index.jsx";
import { CarProvider } from "./contexts/CarContext.jsx";


const App = () => {
  return (
    <CarProvider>
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
    </CarProvider>
  );
};

export default App;
