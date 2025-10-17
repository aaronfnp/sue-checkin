// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbiWp0KHRVWyYNgjffkck2WQClUJ6vV6Q",
  authDomain: "sue-checkin.firebaseapp.com",
  projectId: "sue-checkin",
  storageBucket: "sue-checkin.firebasestorage.app",
  messagingSenderId: "1023002514926",
  appId: "1:1023002514926:web:fe320f5fbc7ab6ed6a6aff"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
