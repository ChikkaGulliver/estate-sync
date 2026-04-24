// 🔥 Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔐 Your Firebase config (paste from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyAqsobU8EIplnsdotzAvrCwDtC1KPe6W20",
  authDomain: "estatesync-67dff.firebaseapp.com",
  projectId: "estatesync-67dff",
  storageBucket: "estatesync-67dff.firebasestorage.app",
  messagingSenderId: "244526681807",
  appId: "1:244526681807:web:93d871ebffbf14c530f1ba"
};

// 🚀 Initialize app
const app = initializeApp(firebaseConfig);

// 📦 Firestore (database)
export const db = getFirestore(app);

// 🔐 Authentication
export const auth = getAuth(app);

// 👑 Admin email (IMPORTANT)
export const ADMIN_EMAIL = "nrchikka176@email.com";