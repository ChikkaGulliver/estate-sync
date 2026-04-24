import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase"; // make sure paths are correct
import "../styles/dashboard.css";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(data);
      setLoading(false);
    });

    return () => unsub();
  }, [navigate]);

  const filtered = orders.filter((o) =>
    filter === "ALL" ? true : (o.status || "Pending").toUpperCase() === filter
  );

  const statusClass = (status) => {
    const s = (status || "Pending").toLowerCase();
    if (s === "approved") return "badge approved";
    if (s === "rejected") return "badge rejected";
    return "badge pending";
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Your Applications</h1>

        <div className="filters">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((f) => (
            <button
              key={f}
              className={filter === f ? "filter active" : "filter"}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="state">Loading applications…</div>
      ) : filtered.length === 0 ? (
        <div className="state">
          No applications yet. Go to <span onClick={() => navigate("/services")} className="link">Services</span> to apply.
        </div>
      ) : (
        <div className="grid">
          {filtered.map((item) => (
            <div className="card" key={item.id}>
              <div className="card-top">
                <h3>{item.serviceName}</h3>
                <span className={statusClass(item.status)}>
                  {item.status || "Pending"}
                </span>
              </div>

              <div className="meta">
                <p><b>Name:</b> {item.name}</p>
                <p><b>Phone:</b> {item.phone}</p>
                <p><b>Location:</b> {item.location}</p>
              </div>

              <div className="card-actions">
                {item.fileURL && (
                  <a
                    href={item.fileURL}
                    target="_blank"
                    rel="noreferrer"
                    className="doc-link"
                  >
                    View Document
                  </a>
                )}
                <span className="time">
                  {item.createdAt?.toDate
                    ? item.createdAt.toDate().toLocaleString()
                    : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}