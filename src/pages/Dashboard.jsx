import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db, auth } from "../firebase";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      // 🔐 Get role safely from Firestore
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      const userRole = snap.exists() ? snap.data().role : "user";
      setRole(userRole);

      let q;

      // 👤 USER → only their applications
      if (userRole === "user") {
        q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
      }

      // 🧑‍💼 AGENT → all tasks
      else {
        q = query(
          collection(db, "orders"),
          orderBy("createdAt", "desc")
        );
      }

      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(data);
      });
    };

    loadData();
  }, [navigate]);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  return (
    <div className="dashboard-page">
      <h1>
        {role === "agent" ? "Agent Tasks" : "My Applications"}
      </h1>

      <div className="grid">
        {orders.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.serviceName}</h3>
            <p><b>Name:</b> {item.name}</p>
            <p><b>Location:</b> {item.location}</p>

            <p className={`status ${item.status?.toLowerCase()}`}>
              {item.status || "Pending"}
            </p>

            {/* Agent controls */}
            {role === "agent" && (
              <div className="actions">
                <button onClick={() => updateStatus(item.id, "Approved")}>
                  Approve
                </button>
                <button onClick={() => updateStatus(item.id, "Rejected")}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}