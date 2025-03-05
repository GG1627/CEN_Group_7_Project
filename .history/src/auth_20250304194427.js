import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Returns the user object
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Log In Function
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Returns the user object
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// Log Out Function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};
