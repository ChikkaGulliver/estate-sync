import { useNavigate } from "react-router-dom";
import "./services.css";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    { category: "Property Registration", name: "Sale Deed Registration" },
    { category: "Property Registration", name: "Gift Deed Registration" },
    { category: "Property Registration", name: "Property Transfer" },

    { category: "Khata & Ownership", name: "Khata Transfer" },
    { category: "Khata & Ownership", name: "Khata Extraction" },
    { category: "Khata & Ownership", name: "Ownership Change" },

    { category: "Construction Approval", name: "Building Plan Approval" },
    { category: "Construction Approval", name: "Construction License" },

    { category: "Land & Layout", name: "Land Conversion" },
    { category: "Land & Layout", name: "Layout Approval" },

    { category: "Legal & Verification", name: "Title Verification" },
    { category: "Legal & Verification", name: "Legal Opinion" },
    { category: "Legal & Verification", name: "Encumbrance Certificate" },

    { category: "Home Buyer Support", name: "Home Loan Assistance" },
    { category: "Home Buyer Support", name: "Property Valuation" },
    { category: "Home Buyer Support", name: "Site Inspection" },

    { category: "Farm Land", name: "Agricultural Land Registration" },
    { category: "Farm Land", name: "Conversion Guidance" },

    { category: "Document Guidance", name: "Document Checklist" },
    { category: "Document Guidance", name: "Application Filing Help" }
  ];

  const handleApply = (serviceName) => {
    navigate(`/service-form/${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="services-page">
      <h1>Our Services</h1>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <p className="category">{service.category}</p>
            <h3>{service.name}</h3>

            <button onClick={() => handleApply(service.name)}>
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}