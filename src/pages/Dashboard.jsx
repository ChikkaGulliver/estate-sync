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
      const userSnap = await getDoc(doc(db, "users", user.uid));
      const userRole = userSnap.exists() ? userSnap.data().role : "user";

      setRole(userRole);

      let q;

      // 👤 USER → only their requests
      if (userRole === "user") {
        q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
      }

      // 👨‍💼 AGENT → show:
      // 1. Unassigned requests
      // 2. Their own assigned requests
      else {
        q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      }

      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // 🔥 AGENT FILTER
        if (userRole === "agent") {
          setOrders(
            data.filter(
              (item) =>
                item.assignedAgentId === null ||
                item.assignedAgentId === user.uid
            )
          );
        } else {
          setOrders(data);
        }
      });
    };

    loadData();
  }, [navigate]);

  // ✅ APPROVE → assign agent
  const approveService = async (id) => {
    await updateDoc(doc(db, "orders", id), {
      status: "Approved",
      assignedAgentId: auth.currentUser.uid
    });
  };

  // ❌ Reject
  const rejectService = async (id) => {
    await updateDoc(doc(db, "orders", id), {
      status: "Rejected"
    });
  };

  // 🔄 Progress update
  const updateProgress = async (id, progress) => {
    await updateDoc(doc(db, "orders", id), {
      progress
    });
  };

  return (
    <div className="dashboard-page">
      <h1>
        {role === "agent" ? "Agent Panel" : "My Applications"}
      </h1>

      <div className="grid">
        {orders.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.serviceName}</h3>

            <p><b>Name:</b> {item.name}</p>
            <p><b>Location:</b> {item.location}</p>

            <p className={`status ${item.status?.toLowerCase()}`}>
              {item.status}
            </p>

            {/* USER VIEW */}
            {role === "user" && (
              <p><b>Progress:</b> {item.progress}</p>
            )}

            {/* AGENT VIEW */}
            {role === "agent" && (
              <>
                {/* Show approve only if not assigned */}
                {item.assignedAgentId === null && (
                  <div className="actions">
                    <button onClick={() => approveService(item.id)}>
                      Accept
                    </button>
                    <button onClick={() => rejectService(item.id)}>
                      Reject
                    </button>
                  </div>
                )}

                {/* Show tracking only if agent owns it */}
                {item.assignedAgentId === auth.currentUser.uid && (
                  <div className="progress-box">
                    <select
                      value={item.progress}
                      onChange={(e) =>
                        updateProgress(item.id, e.target.value)
                      }
                    >
                      <option>Not Started</option>
                      <option>Documents Verified</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}