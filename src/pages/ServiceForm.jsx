import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        serviceName: decodeURIComponent(id),
        name,
        phone,
        details,
        status: "Pending",
        govtFee: 0,
        createdAt: serverTimestamp(),
      });

      alert("✅ Request submitted successfully");

      // Reset
      setName("");
      setPhone("");
      setDetails("");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Error submitting request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Apply for Service</h2>

        <p style={{ color: "#666" }}>
          Service: <b>{decodeURIComponent(id)}</b>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Describe your request / documents"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    background: "#f3f4f6",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    height: "80px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0ea5e9",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};