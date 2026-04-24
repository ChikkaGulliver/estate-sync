import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, ADMIN_EMAIL } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // 🔐 Track login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <h2 style={styles.logo}>EstateSync</h2>

      {/* LINKS */}
      <div style={styles.links}>
        <Link style={getLinkStyle(location, "/")} to="/">
          Home
        </Link>

        <Link style={getLinkStyle(location, "/services")} to="/services">
          Services
        </Link>

        {user && (
          <Link style={getLinkStyle(location, "/dashboard")} to="/dashboard">
            Dashboard
          </Link>
        )}

        {/* 👑 Admin only */}
        {user?.email === ADMIN_EMAIL && (
          <Link style={getLinkStyle(location, "/admin")} to="/admin">
            Admin
          </Link>
        )}
      </div>

      {/* AUTH BUTTONS */}
      <div style={styles.auth}>
        {!user ? (
          <>
            <Link to="/login" style={styles.button}>
              Login
            </Link>
            <Link to="/register" style={styles.buttonOutline}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>
              {user.email}
            </span>

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

// 🎨 ACTIVE LINK STYLE
function getLinkStyle(location, path) {
  return {
    textDecoration: "none",
    color: location.pathname === path ? "#00bcd4" : "white",
    fontSize: "16px"
  };
}

// 🎨 STYLES
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1a1a1a",
    color: "white"
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  auth: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "#00bcd4",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  buttonOutline: {
    padding: "6px 12px",
    border: "1px solid #00bcd4",
    color: "#00bcd4",
    borderRadius: "5px",
    textDecoration: "none"
  }
};