import { useParams, useNavigate } from "react-router-dom";
import { servicesData } from "../utils/servicesData";
import "../styles/serviceDetails.css";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find(
    (s) => s.id === parseInt(id)
  );

  if (!service) return <h2>Service not found</h2>;

  return (
    <div className="details-page">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* MAIN CARD */}
      <div className="details-container">

        <h1>{service.name}</h1>
        <p className="desc">{service.description}</p>

        <h3>Procedure</h3>
        <ul>
          {service.procedure.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        <h3>Documents Required</h3>
        <ul>
          {service.documents.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>

        <button
          className="apply-btn"
          onClick={() =>
            navigate(`/service-form/${service.name}`)
          }
        >
          Apply Now
        </button>

      </div>
    </div>
  );
}