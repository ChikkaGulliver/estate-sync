import { useNavigate } from "react-router-dom";
import "../home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="overlay">
          <h1>EstateSync India</h1>
          <p>Real Estate Documentation Made Simple</p>

          <button
            className="get-started-btn"
            onClick={() => navigate("/services")}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* SLOGANS */}
      <section className="slogans">
        <div className="slogan-box">
          We believe in local expertise guided journey
        </div>

        <div className="slogan-box">
          We assure you transparency & verified professionals
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">

        <h2>Our Vision</h2>
        <p>
          To simplify real estate documentation across India through digital
          innovation and provide easy access to property services.
        </p>

        <h2>Our Mission</h2>
        <p>
          To connect users with verified professionals and ensure transparency,
          speed, and trust in every transaction.
        </p>

        <h2>Our Commitment</h2>
        <p>
          We are committed to delivering reliable, secure, and efficient services
          for all your property-related needs.
        </p>

      </section>

    </div>
  );
}