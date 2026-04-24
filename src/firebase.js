import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqsobU8EIplnsdotzAvrCwDtC1KPe6W20",
  authDomain: "estatesync-67dff.firebaseapp.com",
  projectId: "estatesync-67dff",
  storageBucket: "estatesync-67dff.firebasestorage.app",
  messagingSenderId: "244526681807",
  appId: "1:244526681807:web:93d871ebffbf14c530f1ba"
};

const app = initializeApp(firebaseConfig);

// 🔐 Auth
export const auth = getAuth(app);

// 🗄️ Firestore
export const db = getFirestore(app);