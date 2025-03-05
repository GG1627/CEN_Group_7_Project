import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "./firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSignIn) {
      setIsSignIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSignIn) {
      setIsSignIn(true);
      doSignInWithGoogle().catch;
    }
  };

  return (
    <div>
      <h1>Login Screen</h1>
    </div>
  );
};
