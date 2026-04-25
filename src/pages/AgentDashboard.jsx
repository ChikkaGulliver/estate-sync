import { useState, useEffect } from "react";
import { pb } from "../lib/pb";
import { Zap, Briefcase, ChevronRight } from "lucide-react";

export default function AgentDashboard() {
  const [openRequests, setOpenRequests] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const currentUser = pb.authStore.model;

  useEffect(() => {
    fetchWork();
  }, []);

  const fetchWork = async () => {
    const available = await pb.collection("requests").getFullList({ 
      filter: 'status="pending_agent"',
      expand: 'user'
    });
    setOpenRequests(available);

    const mine = await pb.collection("requests").getFullList({ 
      filter: `assignedAgent="${currentUser.id}"`, 
      expand: 'user'
    });
    setMyJobs(mine);
  };

  const acceptRequest = async (requestId) => {
    try {
      await pb.collection("requests").update(requestId, {
        status: "in_progress", 
        progress: "Agent Assigned - Reviewing Documents", // Sets initial tracking status
        assignedAgent: currentUser.id
      });
      alert("Work Accepted!");
      fetchWork(); 
    } catch (err) {
      alert("Error: Another agent might have claimed this.");
      fetchWork();
    }
  };

  // NEW: Update the tracking progress
  const updateProgress = async (requestId, newProgressStatus) => {
    try {
      await pb.collection("requests").update(requestId, {
        progress: newProgressStatus
      });
      alert("Tracking updated! The user can now see this on their dashboard.");
      fetchWork();
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">Field Agent Dashboard</h1>
        <button onClick={() => { pb.authStore.clear(); window.location.href = '/login'; }} className="text-slate-500 font-bold hover:text-slate-900">Logout</button>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* THE OPEN MARKET (Same as before) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Zap className="text-yellow-500"/> New Jobs Available</h2>
          <div className="space-y-4">
            {openRequests.map(req => (
              <div key={req.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-black text-lg text-slate-900 mb-1">{req.serviceName}</p>
                <p className="text-sm text-slate-600 mb-4">Location: {req.location}</p>
                <button onClick={() => acceptRequest(req.id)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all">
                  Accept & Claim Job
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MY CLAIMED JOBS - WITH LIVE TRACKING CONTROLS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Briefcase className="text-blue-500"/> My Active Files</h2>
          <div className="space-y-4">
            {myJobs.map(job => (
              <div key={job.id} className="p-5 bg-blue-50 rounded-xl border border-blue-100 flex flex-col gap-3">
                <div>
                  <p className="font-black text-blue-900">{job.serviceName}</p>
                  <p className="text-sm text-blue-800 font-medium">Client: {job.applicantName} | {job.phone}</p>
                </div>
                
                {/* Tracking Updater */}
                <div className="bg-white p-3 rounded-lg border border-blue-200 mt-2">
                  <label className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1 block">Update Live Tracking:</label>
                  <div className="flex gap-2">
                    <select 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded p-2 text-sm outline-none"
                      value={job.progress || ""}
                      onChange={(e) => updateProgress(job.id, e.target.value)}
                    >
                      <option value="Agent Assigned - Reviewing Documents">Reviewing Documents</option>
                      <option value="Documents Verified - Preparing File">Documents Verified</option>
                      <option value="Visiting Sub-Registrar Office">Visiting Sub-Registrar Office</option>
                      <option value="Waiting for Government Signature">Waiting for Government Signature</option>
                      <option value="Completed - Documents Ready">Completed - Documents Ready</option>
                    </select>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}