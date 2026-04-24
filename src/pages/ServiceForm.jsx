import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./serviceform.css";

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const serviceName = decodeURIComponent(id || "Service");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "services"), {
        ...form,
        serviceName,
        userId: auth.currentUser?.uid || "",
        status: "Pending",
        createdAt: serverTimestamp()
      });

      alert("Application submitted successfully!");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{serviceName}</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            placeholder="Full Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Phone Number"
            required
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            placeholder="Location"
            required
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
}