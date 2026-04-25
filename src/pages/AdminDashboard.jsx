import { useState, useEffect } from "react";
import { pb } from "../lib/pb";
import { CheckCircle, Clock } from "lucide-react";

export default function AdminDashboard() {
  const [pendingAgents, setPendingAgents] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Fetch unapproved agents
    const agents = await pb.collection("users").getFullList({ filter: 'role="agent" && status="pending"' });
    setPendingAgents(agents);

    // Fetch user requests matching YOUR database schema ('admin_review')
    const requests = await pb.collection("requests").getFullList({ 
      filter: 'status="admin_review"', 
      expand: 'user' // matches your 'user' relation field
    });
    setPendingRequests(requests);
  };

  const approveAgent = async (agentId) => {
    await pb.collection("users").update(agentId, { status: "approved" });
    fetchDashboardData(); 
    alert("Agent Approved! They can now log in.");
  };

  const passRequestToAgents = async (requestId) => {
    // Updates YOUR database 'status' field to 'pending_agent'
    await pb.collection("requests").update(requestId, { 
      status: "pending_agent" 
    });
    fetchDashboardData();
    alert("Request clarified and pushed to the Agent pool!");
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-black mb-8 text-slate-900">Admin Control Center</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* PANEL 1: AGENT APPROVALS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock className="text-orange-500"/> Pending Agent Approvals</h2>
          {pendingAgents.length === 0 ? <p className="text-slate-500">No agents waiting.</p> : null}
          
          <div className="space-y-4">
            {pendingAgents.map(agent => (
              <div key={agent.id} className="p-4 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                <div>
                  <p className="font-bold text-slate-900">{agent.name}</p>
                  <p className="text-sm text-slate-500">Aadhar: {agent.aadhar} | City: {agent.location}</p>
                </div>
                <button onClick={() => approveAgent(agent.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm">
                  Approve Agent
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 2: USER REQUESTS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CheckCircle className="text-blue-500"/> New User Requests</h2>
          {pendingRequests.length === 0 ? <p className="text-slate-500">No new requests.</p> : null}
          
          <div className="space-y-4">
            {pendingRequests.map(req => (
              <div key={req.id} className="p-4 bg-blue-50 rounded-xl flex flex-col gap-3 border border-blue-100">
                <div>
                  <p className="font-black text-blue-900">{req.serviceName}</p> {/* Matches your database */}
                  <p className="text-sm text-blue-700">Client: {req.applicantName} | Phone: {req.phone}</p>
                  <p className="text-sm text-blue-600 mt-1">Details: {req.details}</p>
                </div>
                <button onClick={() => passRequestToAgents(req.id)} className="w-full bg-[#0f172a] hover:bg-slate-800 text-white py-2 rounded-lg font-bold text-sm">
                  Clarify & Send to Agents
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}