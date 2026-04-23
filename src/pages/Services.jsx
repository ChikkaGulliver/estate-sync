import { useNavigate } from "react-router-dom";
import "./services.css";

const services = [
  // Property Registration
  { category: "Property Registration Services", name: "Sale Deed Registration" },
  { category: "Property Registration Services", name: "Gift Deed Registration" },
  { category: "Property Registration Services", name: "Property Transfer" },

  // Khata & Ownership
  { category: "Khata & Ownership Services", name: "Khata Transfer" },
  { category: "Khata & Ownership Services", name: "Khata Extraction" },
  { category: "Khata & Ownership Services", name: "Ownership Change" },

  // Construction Approval
  { category: "Construction Approval Services", name: "Building Plan Approval" },
  { category: "Construction Approval Services", name: "Construction License" },

  // Land & Layout
  { category: "Land & Layout Services", name: "Land Conversion" },
  { category: "Land & Layout Services", name: "Layout Approval" },

  // Legal & Verification
  { category: "Legal & Verification Services", name: "Title Verification" },
  { category: "Legal & Verification Services", name: "Legal Opinion" },
  { category: "Legal & Verification Services", name: "Encumbrance Certificate" },

  // Home Buyer Support
  { category: "Home Buyer Support Services", name: "Home Loan Assistance" },
  { category: "Home Buyer Support Services", name: "Property Valuation" },
  { category: "Home Buyer Support Services", name: "Site Inspection" },

  // Farm Land
  { category: "Farm Land Services", name: "Agricultural Land Registration" },
  { category: "Farm Land Services", name: "Conversion Guidance" },

  // Document Guidance
  { category: "Document Guidance Services", name: "Document Checklist" },
  { category: "Document Guidance Services", name: "Application Filing Help" }
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-page">

      <div className="header">
        <h1>Our Services</h1>
        <p>Select a service and proceed</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">

            <p className="category">{service.category}</p>

            <h3>{service.name}</h3>

            <button
              className="apply-btn"
              onClick={() =>
                navigate("/service-form", {
                  state: { serviceName: service.name }
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