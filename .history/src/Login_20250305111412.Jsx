import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Login Screen</h1>
    </div>
  );
};
