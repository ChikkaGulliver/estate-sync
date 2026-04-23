import { useNavigate } from "react-router-dom";
import "./services.css";

const services = [
  { category: "Property Registration", name: "Sale Deed Registration" },
  { category: "Property Registration", name: "Gift Deed Registration" },

  { category: "Khata Services", name: "Khata Transfer" },
  { category: "Khata Services", name: "Ownership Change" },

  { category: "Construction", name: "Building Plan Approval" },

  { category: "Land Services", name: "Land Conversion" },
  { category: "Land Services", name: "Layout Approval" },

  { category: "Legal", name: "Encumbrance Certificate" },
  { category: "Legal", name: "Title Verification" },

  { category: "Support", name: "Home Loan Assistance" },
  { category: "Support", name: "Property Valuation" },
  { category: "Support", name: "Site Inspection" },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Services</h1>

      <div style={{ display: "grid", gap: "15px" }}>
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <p>{service.category}</p>
            <h3>{service.name}</h3>

            <button
              onClick={() =>
                navigate(`/service-form/${service.name}`)
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