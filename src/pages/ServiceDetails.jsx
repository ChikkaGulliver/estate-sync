import { useParams, useNavigate } from "react-router-dom";
import "./servicedetails.css";

// All services grouped by category
const servicesData = {
  "property-registration": {
    title: "Property Registration Services",
    services: [
      "Sale Deed Registration",
      "Gift Deed Registration",
      "Property Transfer"
    ]
  },
  "khata-ownership": {
    title: "Khata & Ownership Services",
    services: [
      "Khata Transfer",
      "Khata Extraction",
      "Ownership Change"
    ]
  },
  "construction-approval": {
    title: "Construction Approval Services",
    services: [
      "Building Plan Approval",
      "Construction License"
    ]
  },
  "land-layout": {
    title: "Land & Layout Services",
    services: [
      "Land Conversion",
      "Layout Approval"
    ]
  },
  "legal-verification": {
    title: "Legal & Verification Services",
    services: [
      "Title Verification",
      "Legal Opinion",
      "Encumbrance Certificate"
    ]
  },
  "home-buyer": {
    title: "Home Buyer Support Services",
    services: [
      "Home Loan Assistance",
      "Property Valuation",
      "Site Inspection"
    ]
  },
  "farm-land": {
    title: "Farm Land Services",
    services: [
      "Agricultural Land Registration",
      "Conversion Guidance"
    ]
  },
  "document-guidance": {
    title: "Document Guidance Services",
    services: [
      "Document Checklist",
      "Application Filing Help"
    ]
  }
};

export default function ServiceDetails() {
  const { category } = useParams();
  const navigate = useNavigate();

  const selected = servicesData[category];

  // If wrong URL
  if (!selected) {
    return (
      <div className="details-page">
        <h2>Service Not Found</h2>
      </div>
    );
  }

  return (
    <div className="details-page">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{selected.title}</h1>

      {/* SERVICES LIST */}
      <div className="services-grid">
        {selected.services.map((service, index) => (
          <div key={index} className="service-card">

            <h3>{service}</h3>

            <button
              onClick={() =>
                navigate("/service-form", {
                  state: { serviceName: service }
                })
              }
            >
              Apply
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}