import React, { useState, useEffect } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignInWithPhoneNumber,
} from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import "./LoginScreen.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'
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
      if (loginMethod === "email") {
        await doSignInWithEmailAndPassword(email, password);
      } else {
        await doSignInWithPhoneNumber(phoneNumber);
      }
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

        <div className="login-method-selector">
          <button
            onClick={() => setLoginMethod("email")}
            className={`method-button ${
              loginMethod === "email" ? "active" : ""
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => setLoginMethod("phone")}
            className={`method-button ${
              loginMethod === "phone" ? "active" : ""
            }`}
          >
            Phone Login
          </button>
        </div>

        <form className="form" onSubmit={handleLogin}>
          {loginMethod === "email" ? (
            <>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
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
                />
              </div>
            </>
          ) : (
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="input"
              />
            </div>
          )}

          <button type="submit" className="button">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleSignIn} className="google-button">
          Log in with Google
        </button>

        <p className="signupText">
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
