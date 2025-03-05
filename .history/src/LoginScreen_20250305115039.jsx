import React, { useState } from "react";
import { doSignInWithEmailAndPassword } from "./firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      setError(err.message);
    }
  };

  if (userLoggedIn) {
    return <p>Already logged in. Redirecting...</p>;
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
