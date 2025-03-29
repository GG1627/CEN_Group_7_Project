// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNwkS9OSibjbcrBvd1f5KRAtMWghIXrJQ",
  authDomain: "cenproject-d07ba.firebaseapp.com",
  projectId: "cenproject-d07ba",
  storageBucket: "cenproject-d07ba.firebasestorage.app",
  messagingSenderId: "919785088214",
  appId: "1:919785088214:web:674f6319978c4384965577"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
