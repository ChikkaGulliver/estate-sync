import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <div className="hero">
        <div className="overlay">
          <h1>EstateSync</h1>

          <p className="subtitle">
            Simplifying property services like registration, approvals & tracking.
          </p>

          <button onClick={() => navigate("/services")}>
            Get Started
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <h2>Why Choose Us</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>⚡ Fast Process</h3>
            <p>No more long queues. Apply instantly online.</p>
          </div>

          <div className="feature-card">
            <h3>📊 Live Tracking</h3>
            <p>Track your application anytime.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>Your data is safe and protected.</p>
          </div>
        </div>
      </div>

      {/* NEW SECTION: VISION / MISSION / COMMITMENT */}
      <div className="about">
        <h2>Our Purpose</h2>

        <div className="about-grid">

          <div className="about-card">
            <h3>🌍 Our Vision</h3>
            <p>
              To revolutionize property services by making them fully digital,
              transparent, and accessible to everyone.
            </p>
          </div>

          <div className="about-card">
            <h3>🎯 Our Mission</h3>
            <p>
              To simplify property-related processes like registration,
              approvals, and tracking through a seamless online platform.
            </p>
          </div>

          <div className="about-card">
            <h3>🤝 Our Commitment</h3>
            <p>
              We are committed to delivering fast, secure, and reliable services
              while ensuring user satisfaction and trust.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}