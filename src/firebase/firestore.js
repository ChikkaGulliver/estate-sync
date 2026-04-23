import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export const createOrder = async (order) => {
  return await addDoc(collection(db, "orders"), order);
};

export const getUserOrders = async (userId) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};