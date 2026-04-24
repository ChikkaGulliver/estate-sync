import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";

export default function AdminDashboard() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("role", "==", "agent"),
      where("status", "==", "pending")
    );

    onSnapshot(q, (snapshot) => {
      setAgents(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });
  }, []);

  const approveAgent = async (id) => {
    const agentId = "AGENT-" + Math.floor(Math.random() * 100000);

    await updateDoc(doc(db, "users", id), {
      status: "approved",
      agentId
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Pending Agents</h2>

      {agents.map(agent => (
        <div key={agent.id} style={{ marginBottom: "15px" }}>
          <p><b>Name:</b> {agent.name}</p>
          <p><b>Email:</b> {agent.email}</p>

          <button onClick={() => approveAgent(agent.id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}