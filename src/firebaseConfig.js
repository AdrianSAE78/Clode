// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaPU84ZgIkpb3y9ly7qt4e2C9seDGzG_s",
  authDomain: "intermod-45362.firebaseapp.com",
  projectId: "intermod-45362",
  storageBucket: "intermod-45362.firebasestorage.app",
  messagingSenderId: "1031113295957",
  appId: "1:1031113295957:web:974ed4254ff22792326cdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();