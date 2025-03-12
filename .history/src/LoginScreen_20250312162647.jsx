import React, { useState, useEffect } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import "./LoginScreen.css";
import { FcGoogle } from "react-icons/fc";

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
      <div className="formContainer" style={{ maxWidth: "400px" }}>
        <h2
          className="title"
          style={{ fontSize: "2rem", marginBottom: "1.5rem" }}
        >
          Login to your account
        </h2>
        {error && <p className="error">{error}</p>}

        {/* Email/Password login form */}
        <form className="form" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              style={{ padding: "12px", fontSize: "1.1rem" }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
              style={{ padding: "12px", fontSize: "1.1rem" }}
            />
          </div>
          <button
            type="submit"
            className="button"
            style={{ padding: "12px", fontSize: "1.1rem" }}
          >
            Login
          </button>
        </form>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="google-button"
          style={{ padding: "12px", fontSize: "1.1rem" }}
        >
          Log in with Google
          <FcGoogle size={24} />
        </button>

        <p className="signupText" style={{ fontSize: "1.1rem" }}>
          Don't have an account?{" "}
          <a href="/signup" className="signupLink">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
