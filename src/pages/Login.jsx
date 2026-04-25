import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pb } from "../lib/pb";
import { Mail, Lock, AlertCircle, Building2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate with PocketBase
      const authData = await pb.collection("users").authWithPassword(email, password);
      const user = authData.record;

      // 2. Security Check: Is this an unapproved agent?
      if (user.role === "agent" && user.status !== "approved") {
        pb.authStore.clear(); // Log them back out instantly
        throw new Error("Your agent account is still pending Admin approval.");
      }

      // 3. Route to the correct dashboard
      if (user.role === "admin") {
        navigate("/dashboard/admin");
      } else if (user.role === "agent") {
        navigate("/dashboard/agent");
      } else {
        navigate("/dashboard/user");
      }

    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-100 p-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
            <Building2 className="text-blue-600" size={24} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Log in to your EstateSync account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-sm border border-red-100">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email" 
              required 
              placeholder="Email Address"
              autoComplete="off" // Stops browser from remembering wrong emails
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password" 
              required 
              placeholder="Password"
              autoComplete="new-password" // Forces browser to stop auto-filling
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold mt-4 transition-all shadow-lg shadow-blue-500/30"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 font-medium">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#0f172a] font-bold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}