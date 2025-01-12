// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "import.meta.env.VITE_APP_FIREBASE_API_KEY",
  authDomain: "taskmanager-23111.firebaseapp.com",
  projectId: "taskmanager-23111",
  storageBucket: "taskmanager-23111.firebasestorage.app",
  messagingSenderId: "889248907179",
  appId: "1:889248907179:web:458c00169f286a5f3c5cee",
  measurementId: "G-4WS30HN6BE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);