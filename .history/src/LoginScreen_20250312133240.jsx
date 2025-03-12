import React, { useState, useEffect } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignInWithPhoneNumber,
} from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import "./LoginScreen.css";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(""); // For OTP verification
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard");
    }
  }, [userLoggedIn, navigate]);

  // Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Phone Login (Step 1: Send OTP)
  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const result = await doSignInWithPhoneNumber(phoneNumber, recaptcha);
      setConfirmationResult(result);
    } catch (err) {
      setError(err.message);
    }
  };

  // Phone Login (Step 2: Verify OTP)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || !confirmationResult) {
      setError("Invalid OTP verification.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Google Login
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

        {/* Email/Password login form */}
        <form className="form" onSubmit={handleEmailLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Login with Email
          </button>
        </form>

        <h1>OR</h1>

        {/* Phone Number Login */}
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input"
          />
          <button onClick={handleSendOtp} className="button">
            Send OTP
          </button>
        </div>

        {confirmationResult && (
          <form className="form" onSubmit={handleVerifyOtp}>
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input"
              />
            </div>
            <button type="submit" className="button">
              Verify OTP
            </button>
          </form>
        )}

        {/* Google Sign-In Button */}
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

      {/* Invisible reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
