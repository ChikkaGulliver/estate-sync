import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Your Requests</h1>

      {orders.length === 0 ? (
        <p>No requests found</p>
      ) : (
        orders.map((order) => {
          const govtFee = Number(order.govtFee || 0);
          const platformFee = 799;
          const total = govtFee + platformFee;

          return (
            <div key={order.id} style={styles.card}>
              <h3>{order.serviceName}</h3>

              <p><b>Name:</b> {order.name}</p>
              <p><b>Phone:</b> {order.phone}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={{ color: "orange" }}>
                  {order.status || "Pending"}
                </span>
              </p>

              <p><b>Details:</b> {order.details}</p>

              <p><b>Govt Fee:</b> ₹ {govtFee}</p>
              <p><b>Platform Fee:</b> ₹ {platformFee}</p>
              <p><b>Total:</b> ₹ {total}</p>

              {order.createdAt && (
                <p style={{ fontSize: "12px", color: "#666" }}>
                  Submitted on:{" "}
                  {order.createdAt.toDate
                    ? order.createdAt.toDate().toLocaleString()
                    : "N/A"}
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};