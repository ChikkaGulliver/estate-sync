import { useLocation } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const location = useLocation();
  const data = location.state;

  // If user directly opens dashboard without submitting
  if (!data) {
    return (
      <div className="dashboard">
        <h2>No Service Data Found</h2>
        <p>Please apply for a service first.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* HEADER */}
      <h1>User Dashboard</h1>

      <h3>Service Selected: {data.serviceName}</h3>

      {/* TRACKING SECTION */}
      <div className="card">
        <h2>Tracking Status</h2>

        <ul>
          <li className="done">✔ Documents Submitted</li>
          <li className="progress">⏳ Verification in Progress</li>
          <li>Agent Assignment Pending</li>
          <li>Processing</li>
          <li>Completed</li>
        </ul>
      </div>

      {/* CHARGES */}
      <div className="card">
        <h2>Charges Breakdown</h2>

        <p>Agent Commission (6%): ₹{data.agentCommission}</p>
        <p>Platform Fee: ₹{data.platformFee}</p>

        <hr />

        <h3>Total Amount: ₹{data.total}</h3>
      </div>

      {/* DELIVERY */}
      <div className="card">
        <h2>Delivery Details</h2>

        <p>
          Your service will be delivered via:
          <br /><br />
          📧 Email (Digital Copy)
          <br />
          📦 Physical Post to your registered address
        </p>
      </div>

    </div>
  );
}