import { useState, useEffect } from "react";
import { pb } from "../lib/pb";
import { Clock, CheckCircle, Search } from "lucide-react";

export default function UserDashboard() {
  const [myRequests, setMyRequests] = useState([]);
  const currentUser = pb.authStore.model;

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      // Fetch only requests made by THIS logged-in user
      const records = await pb.collection("requests").getFullList({
        filter: `user="${currentUser.id}"`, // Matches your database 'user' relation
        sort: '-created', // Newest first
      });
      setMyRequests(records);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    window.location.href = '/login';
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">My Property Work</h1>
          <p className="text-slate-500">Welcome back, {currentUser.name}</p>
        </div>
        <button onClick={handleLogout} className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold hover:bg-slate-100">
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-6 text-slate-900">Application Tracking</h2>
        
        {myRequests.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <Search className="mx-auto text-slate-400 mb-2" size={32} />
            <p className="text-slate-600 font-medium">You have no active requests.</p>
            <p className="text-sm text-slate-400">Head to the Services page to start one!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myRequests.map(req => (
              <div key={req.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
                
                {/* Request Info */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-lg text-slate-900">{req.serviceName}</h3>
                    
                    {/* Status Badge */}
                    {req.status === "admin_review" && <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">Admin Review</span>}
                    {req.status === "pending_agent" && <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">Finding Agent</span>}
                    {req.status === "in_progress" && <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">In Progress</span>}
                  </div>
                  <p className="text-sm text-slate-500">Location: {req.location}</p>
                </div>

                {/* Live Tracking Bar */}
                <div className="md:w-1/2 bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="mt-0.5">
                    {req.status === "in_progress" ? <Clock className="text-blue-500" size={20}/> : <CheckCircle className="text-slate-300" size={20}/>}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Live Status Update</p>
                    <p className="font-bold text-slate-800">
                      {req.progress || "Awaiting initial review..."}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}