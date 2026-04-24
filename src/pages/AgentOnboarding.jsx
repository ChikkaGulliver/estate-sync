import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AgentOnboarding() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [aadhar, setAadhar] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    try {
      await setDoc(doc(db, "users", state.uid), {
        name: state.name,
        email: state.email,
        phone: state.phone,
        aadhar,
        location,

        role: "agent",
        status: "pending",   // 🔥 must wait for admin
        agentId: null,

        createdAt: serverTimestamp(),
      });

      alert("Submitted! Wait for admin approval.");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth">
      <h2>Agent Registration</h2>

      <input
        placeholder="Aadhar Number"
        onChange={(e) => setAadhar(e.target.value)}
      />

      <input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}