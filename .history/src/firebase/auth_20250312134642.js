import { auth } from "./firebaseConfig";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Email/Password Authentication
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google Authentication
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

// Sign Out
export const doSignOut = async () => {
  return auth.signOut();
};

// Phone Authentication Setup
const setupRecaptcha = () => {
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container", // Ensure this is an actual DOM element with the ID 'recaptcha-container'
    {
      size: "invisible", // You can change this to 'normal' if needed
      callback: (response) => {
        console.log("reCAPTCHA solved!");
      },
    },
    auth
  );
  return recaptchaVerifier;
};

// Send OTP to Phone Number
export const sendOTP = async (phoneNumber) => {
  setupRecaptcha();
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );
    return confirmationResult; // Store this to verify OTP later
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Verify OTP Code
export const verifyOTP = async (confirmationResult, otpCode) => {
  try {
    const result = await confirmationResult.confirm(otpCode);
    return result.user; // User is now signed in
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
