import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./serviceform.css";

// Documents required for each service
const serviceDocs = {
  "Sale Deed Registration": ["Sale Deed", "Owner ID Proof"],
  "Gift Deed Registration": ["Gift Deed", "Owner ID Proof"],
  "Property Transfer": ["Transfer Papers", "Tax Receipt"],

  "Khata Transfer": ["Previous Khata", "Property ID"],
  "Khata Extraction": ["Property Details"],
  "Ownership Change": ["Ownership Proof"],

  "Building Plan Approval": ["Building Plan", "Engineer Certificate"],
  "Construction License": ["Construction Details"],

  "Land Conversion": ["Land Records", "Conversion Form"],
  "Layout Approval": ["Layout Plan", "Survey Report"],

  "Title Verification": ["Sale Agreement", "Title Deed"],
  "Legal Opinion": ["Property Documents"],
  "Encumbrance Certificate": ["Property Details"],

  "Home Loan Assistance": ["Income Proof", "Bank Statements"],
  "Property Valuation": ["Property Documents"],
  "Site Inspection": ["Property Address"],

  "Agricultural Land Registration": ["Land Ownership Proof"],
  "Conversion Guidance": ["Land Details"],

  "Document Checklist": ["Existing Documents"],
  "Application Filing Help": ["Required Documents"]
};

export default function ServiceForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const serviceName = location.state?.serviceName || "Service";

  const [aadhar, setAadhar] = useState("");
  const [files, setFiles] = useState({});

  // Handle file upload
  const handleFileChange = (doc, file) => {
    setFiles((prev) => ({
      ...prev,
      [doc]: file
    }));
  };

  // Submit form
  const handleSubmit = () => {
    if (!aadhar || aadhar.length !== 12) {
      alert("Enter valid 12-digit Aadhar number");
      return;
    }

    const requiredDocs = serviceDocs[serviceName] || [];

    for (let doc of requiredDocs) {
      if (!files[doc]) {
        alert(`Please upload ${doc}`);
        return;
      }
    }

    // 💰 Charges Calculation
    const basePrice = 5000;
    const agentCommission = basePrice * 0.06;
    const platformFee = 599;
    const total = basePrice + agentCommission + platformFee;

    // Redirect to dashboard
    navigate("/dashboard", {
      state: {
        serviceName,
        aadhar,
        agentCommission,
        platformFee,
        total
      }
    });
  };

  return (
    <div className="form-page">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="form-card">
        <h2>{serviceName}</h2>

        {/* AADHAR INPUT */}
        <input
          type="number"
          placeholder="Enter 12-digit Aadhar Number"
          onChange={(e) => setAadhar(e.target.value)}
        />

        {/* DOCUMENT UPLOADS */}
        {(serviceDocs[serviceName] || []).map((doc, index) => (
          <div key={index} className="doc-field">
            <label>{doc}</label>

            <input
              type="file"
              onChange={(e) =>
                handleFileChange(doc, e.target.files[0])
              }
            />
          </div>
        ))}

        {/* SUBMIT */}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Application
        </button>
      </div>

    </div>
  );
}