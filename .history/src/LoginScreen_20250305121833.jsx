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

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #EFF6FF, #DBEAFE)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1rem",
    },
    formContainer: {
      maxWidth: "28rem",
      width: "100%",
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "0.5rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    title: {
      marginTop: "1.5rem",
      textAlign: "center",
      fontSize: "1.875rem",
      fontWeight: "800",
      color: "#111827",
    },
    error: {
      color: "#EF4444",
      fontSize: "0.875rem",
      textAlign: "center",
      marginTop: "0.5rem",
    },
    form: {
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    input: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      borderRadius: "0.5rem",
      border: "1px solid #D1D5DB",
      fontSize: "0.875rem",
    },
    button: {
      width: "100%",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      backgroundColor: "#2563EB",
      color: "white",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
    },
    signupText: {
      marginTop: "0.5rem",
      textAlign: "center",
      fontSize: "0.875rem",
      color: "#4B5563",
    },
    signupLink: {
      color: "#2563EB",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

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

  if (userLoggedIn) {
    return (
      <p style={{ textAlign: "center", color: "#374151" }}>
        Already logged in. Redirecting...
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login to your account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form style={styles.form} onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.signupText}>
          Don't have an account?{" "}
          <a href="/signup" style={styles.signupLink}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
