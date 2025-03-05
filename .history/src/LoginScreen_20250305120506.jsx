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
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  if (userLoggedIn) {
    return (
      <p className="text-center text-gray-700">
        Already logged in. Redirecting...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
