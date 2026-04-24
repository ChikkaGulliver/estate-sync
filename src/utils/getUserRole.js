import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function getUserRole(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data().role : "user";
}