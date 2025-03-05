import React, { useState, createContext, useEffect } from "react";
import { auth } from "../firebase";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initilizeUser);
    return unsubscribe;
  }, []);

  async function initilizeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }
}
