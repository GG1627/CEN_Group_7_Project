import { useState } from "react";
import { logIn, signUp, logOut } from "./auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await logIn(email, password);
      console.log("Logged in:", user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password);
      console.log("Signed up:", user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logged out successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login / Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Login;
