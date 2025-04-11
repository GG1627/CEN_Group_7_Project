import React, { useState, useEffect } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import "../css/LoginScreen.css";
import { FcGoogle } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard");
    }
  }, [userLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await doSignInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="title">Login to your account</h2>
        {error && <p className="error">{error}</p>}

        <form className="form" onSubmit={handleLogin}>
          <div className="emailInput">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
            <FaUser className="input-icon" />
          </div>
          <div className="passwordInput">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
            <FaLock className="input-icon" />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>

        <button onClick={handleGoogleSignIn} className="google-button">
          Log in with Google
          <FcGoogle size={28} className="google-icon" />
        </button>

        <p className="signupText">
          Don't have an account?{" "}
          <a href="/signup" className="signupLink">
            Sign Up
          </a>
        </p>
      </div>
      <div className="footerContainer">
        <h3 className="footerText">
          © 2025 Gael Garcia, Kevin Nguyen, Alexis Simpson, and Jimmy Joseph.
          All rights reserved.
        </h3>
      </div>
    </div>
  );
};

export default Login;
