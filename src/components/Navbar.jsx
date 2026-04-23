import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">

      {/* LOGO */}
      <h2 className="logo">EstateSync</h2>

      {/* NAV LINKS */}
      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/services"
          className={location.pathname === "/services" ? "active" : ""}
        >
          Services
        </Link>

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
      </div>

      {/* AUTH BUTTONS */}
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/register">
          <button className="register-btn">Register</button>
        </Link>
      </div>

    </nav>
  );
}