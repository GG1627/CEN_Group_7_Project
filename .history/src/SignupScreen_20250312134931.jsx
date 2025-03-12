import React, { useState, useEffect } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
  sendOTP,
  verifyOTP,
} from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import "./SignupScreen.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null); // Store the confirmation result
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard");
    }
  }, [userLoggedIn, navigate]);

  // Handle email/password signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google SignUp
  const handleGoogleSignIn = async () => {
    try {
      await doSignInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Send OTP to the phone number
  const handlePhoneSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const confirmation = await sendOTP(phoneNumber);
      setConfirmationResult(confirmation); // Store the confirmation result for later use
    } catch (err) {
      setError(err.message);
    }
  };

  // Verify OTP to sign up the user
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);
    if (confirmationResult) {
      try {
        await verifyOTP(confirmationResult, otp);
        navigate("/dashboard"); // Navigate after successful verification
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please request an OTP first.");
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="title">Create your account</h2>
        {error && <p className="error">{error}</p>}

        {/* Email/Password SignUp Form */}
        <form className="form" onSubmit={handleSignup}>
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
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>

        {/* Phone Number SignUp Form */}
        <form className="form" onSubmit={handlePhoneSignup}>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Send OTP
          </button>
        </form>

        {/* OTP Verification Form */}
        {confirmationResult && (
          <form className="form" onSubmit={handleVerifyOTP}>
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="input"
              />
            </div>
            <button type="submit" className="button">
              Verify OTP
            </button>
          </form>
        )}

        {/* Google Sign-Up Button */}
        <button onClick={handleGoogleSignIn} className="google-button">
          Sign up with Google
        </button>

        <p className="loginText">
          Already have an account?{" "}
          <a href="/" className="loginLink">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
