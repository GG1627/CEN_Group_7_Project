import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import "./SignupScreen.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate("/dashboard"); // Redirect after signing up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="title">Create your account</h2>
        {error && <p className="error">{error}</p>}
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
