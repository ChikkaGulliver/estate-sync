import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <h2 className="logo">EstateSync</h2>

      {/* LINKS */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </>
        ) : (
          <>
            <span className="user-pill">
              {user.email.split("@")[0]}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}