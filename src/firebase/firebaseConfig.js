// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqZXdnaRaQCUQuTFB4FolOS8WQV4S1M4c",
  authDomain: "cen-group-7.firebaseapp.com",
  databaseURL: "https://cen-group-7-default-rtdb.firebaseio.com/",
  projectId: "cen-group-7",
  storageBucket: "cen-group-7.firebasestorage.app",
  messagingSenderId: "161117484310",
  appId: "1:161117484310:web:4a34540a2303f58c22cc37",
  measurementId: "G-C73NCL9KH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };