// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_SECRET_KEY,
  authDomain: "intermod-f3902.firebaseapp.com",
  projectId: "intermod-f3902",
  storageBucket: "intermod-f3902.firebasestorage.app",
  messagingSenderId: "38796577406",
  appId: "1:38796577406:web:08aac12df725963e54e62f",
  measurementId: "G-2KQQV8XKKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();