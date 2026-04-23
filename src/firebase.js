// 🔥 Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔥 Your Firebase config (from your screenshot)
const firebaseConfig = {
  apiKey: "AIzaSyAqsobU8ElpnsdotzAvrCwDtC1KPe6W20",
  authDomain: "estatesync-67dff.firebaseapp.com",
  projectId: "estatesync-67dff",
  storageBucket: "estatesync-67dff.appspot.com",
  messagingSenderId: "244526681807",
  appId: "1:244526681807:web:93d871ebffbf14c530f1ba",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Export services
export const db = getFirestore(app);
export const storage = getStorage(app);