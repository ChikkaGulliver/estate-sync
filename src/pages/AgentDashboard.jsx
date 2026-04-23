import { useState } from "react";
import "./agentdashboard.css";

export default function AgentDashboard() {

  // Dummy assigned requests (you can replace later with Firebase data)
  const [requests, setRequests] = useState([
    {
      id: 1,
      service: "Sale Deed Registration",
      userAadhar: "123456789012",
      status: "Documents Submitted"
    },
    {
      id: 2,
      service: "Khata Transfer",
      userAadhar: "987654321098",
      status: "Verification in Progress"
    }
  ]);

  // Update status
  const updateStatus = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  return (
    <div className="agent-dashboard">

      <h1>Agent Dashboard</h1>

      {requests.map((req) => (
        <div key={req.id} className="request-card">

          <h3>{req.service}</h3>

          <p><strong>Aadhar:</strong> {req.userAadhar}</p>
          <p><strong>Status:</strong> {req.status}</p>

          {/* ACTION BUTTONS */}
          <div className="actions">

            <button
              onClick={() => updateStatus(req.id, "Verification in Progress")}
            >
              Verify Documents
            </button>

            <button
              onClick={() => updateStatus(req.id, "Agent Assigned")}
            >
              Assign Self
            </button>

            <button
              onClick={() => updateStatus(req.id, "Processing")}
            >
              Start Processing
            </button>

            <button
              onClick={() => updateStatus(req.id, "Completed")}
            >
              Mark Completed
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}