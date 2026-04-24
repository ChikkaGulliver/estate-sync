import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/serviceform.css";

export default function ServiceForm() {
  const { serviceName } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Submitted!");
    navigate("/dashboard");
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
            placeholder="Name"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
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

          <button type="submit">Submit</button>
        </form>
      </div>

    </div>
  );
}