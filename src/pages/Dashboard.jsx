import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  // 🔐 Check login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsub();
  }, []);

  // 📦 Fetch services in real-time
  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(list);
    });

    return () => unsub();
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Dashboard</h2>
        <div>
          <span style={{ marginRight: "15px" }}>
            {user?.email}
          </span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <h3 style={{ marginTop: "20px" }}>Your Applications</h3>

      {services.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <div style={styles.grid}>
          {services.map((service) => (
            <div key={service.id} style={styles.card}>
              
              <h4>{service.serviceName}</h4>

              <p>
                <b>Status:</b>{" "}
                <span style={getStatusStyle(service.status)}>
                  {service.status || "Pending"}
                </span>
              </p>

              <p>
                <b>Location:</b> {service.location || "N/A"}
              </p>

              {/* DOCUMENT */}
              {service.fileURL && (
                <a
                  href={service.fileURL}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  View Document
                </a>
              )}

              <p style={styles.date}>
                {service.createdAt?.toDate
                  ? service.createdAt.toDate().toLocaleString()
                  : ""}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 🎨 STYLES */

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoutBtn: {
    padding: "8px 12px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f1f5f9",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    color: "#0ea5e9"
  },
  date: {
    marginTop: "10px",
    fontSize: "12px",
    color: "gray"
  }
};

// 🔥 STATUS COLORS
function getStatusStyle(status) {
  switch (status) {
    case "Approved":
      return { color: "green", fontWeight: "bold" };
    case "Rejected":
      return { color: "red", fontWeight: "bold" };
    default:
      return { color: "orange", fontWeight: "bold" };
  }
}