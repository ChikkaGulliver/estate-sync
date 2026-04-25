import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pb } from "../lib/pb";
import { 
  MapPin, 
  CreditCard, 
  Briefcase, 
  ShieldCheck, 
  UploadCloud, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function AgentOnboarding() {
  const navigate = useNavigate();
  const { state } = useLocation(); 

  const [form, setForm] = useState({
    aadhaar: "",
    location: "",
    experience: "1-3 Years",
  });

  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // SECURITY CHECK: Prevent users from bypassing the registration flow
  useEffect(() => {
    if (!state || !state.email || !state.phone) {
      navigate("/register");
    }
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Aadhaar Validation (12 digits)
    if (form.aadhaar.replace(/\s/g, '').length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    setIsLoading(true);

    try {
      // Create the final Agent user in PocketBase
      // Status is strictly "pending" until an Admin approves them
      await pb.collection("users").create({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirm: state.password,
        role: "agent",
        status: "pending", 
        phone: state.phone,
        location: form.location,
        aadhaar: form.aadhaar,
      });

      alert("Application submitted successfully! Please wait for Admin approval.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      setError("Failed to submit application. Your email or phone may already be registered.");
    } finally {
      setIsLoading(false);
    }
  };

  // Safe fallback if state is missing while redirecting
  if (!state) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="w-8 h-1 bg-accent rounded-full"></div>
          <div className="w-8 h-1 bg-accent rounded-full"></div>
          <div className="w-8 h-1 bg-accent rounded-full relative">
             <div className="absolute -top-3 -right-2 bg-white rounded-full"><CheckCircle2 className="w-6 h-6 text-accent"/></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-brand mb-2">Final Step</h2>
          <p className="text-gray-500">Complete your professional profile to join the EstateSync agent network.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Operating Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Operating City/Area</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                placeholder="e.g., Mysuru, Karnataka"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
          </div>

          {/* Aadhaar Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number (ID Verification)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                maxLength="14" // Account for spaces if they type them
                placeholder="XXXX XXXX XXXX"
                value={form.aadhaar}
                onChange={(e) => setForm({ ...form, aadhaar: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all tracking-widest"
              />
            </div>
          </div>

          {/* Experience Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Real Estate Experience</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <select
                required
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-gray-700 appearance-none"
              >
                <option value="Less than 1 Year">Less than 1 Year</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>
          </div>

          {/* Document Upload (Mock for UI) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Agent License or Govt ID</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setFileName(e.target.files[0]?.name || "")}
              />
              <div className="flex flex-col items-center pointer-events-none">
                <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</span>
                <span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</span>
              </div>
            </div>
            {fileName && (
              <div className="mt-3 bg-blue-50 text-blue-700 p-3 rounded-lg text-sm font-medium flex justify-between items-center border border-blue-100">
                <span>Attached: {fileName}</span>
                <button type="button" onClick={() => setFileName("")} className="text-blue-500 hover:text-blue-800">Remove</button>
              </div>
            )}
          </div>

          {/* Warning Note */}
          <div className="bg-yellow-50 p-4 rounded-xl flex gap-3 border border-yellow-100 mt-6">
            <ShieldCheck className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <p className="text-xs text-yellow-800 leading-relaxed">
              <strong>Notice:</strong> Your profile will be manually verified by EstateSync Administrators. Any false information will result in a permanent ban from the platform.
            </p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6 bg-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? "Submitting Profile..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}