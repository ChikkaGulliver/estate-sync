import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/serviceform.css";

export default function ServiceForm() {
  const { name } = useParams();
  const navigate = useNavigate();

  const serviceName = decodeURIComponent(name || "");

  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
  });

  const [fileName, setFileName] = useState(""); // only store file name
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Save to Firestore (no file upload)
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        serviceName,
        name: form.name,
        location: form.location,
        phone: form.phone,
        fileName, // only name saved
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("Application submitted successfully!");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="form-card">
        <h2>{serviceName}</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            required
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Location"
            required
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <label>Upload Document (optional)</label>
          <input
            type="file"
            onChange={(e) =>
              setFileName(e.target.files[0]?.name || "")
            }
          />

          {fileName && <p>Selected: {fileName}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
}