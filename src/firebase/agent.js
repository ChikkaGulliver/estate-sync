import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

// fetch orders
export const getAgentOrders = async (agentId) => {
  const q = query(collection(db, "orders"), where("agentId", "==", agentId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// update status
export const updateOrderStatus = async (orderId, status) => {
  const ref = doc(db, "orders", orderId);
  await updateDoc(ref, { status });
};

// update milestones
export const updateMilestone = async (orderId, milestones) => {
  const ref = doc(db, "orders", orderId);
  await updateDoc(ref, { milestones });
};