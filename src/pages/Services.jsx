import { useNavigate } from "react-router-dom";
import { servicesData } from "../utils/servicesData";
import "../styles/services.css";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-page">
      <h1>Our Services</h1>

      <div className="services-grid">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">

            <small>{service.category}</small>
            <h3>{service.name}</h3>

            <button
              onClick={() => navigate(`/service/${service.id}`)}
            >
              See More
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}