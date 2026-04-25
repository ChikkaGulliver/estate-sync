import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

export default function PhoneVerification() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Phone, Step 2: OTP
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    
    setError("");
    setIsLoading(true);

    // SIMULATING API CALL FOR OTP (Since PocketBase needs a 3rd party like Twilio for SMS)
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      // alert("For testing purposes, the OTP is: 123456");
    }, 1500);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // SIMULATING OTP VERIFICATION
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") {
        // Proceed to agent onboarding, passing along previous registration data
        navigate("/agent-onboarding", {
          state: {
            ...state,
            phone: phone,
          },
        });
      } else {
        setError("Invalid OTP. Try '123456' for testing.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl font-extrabold text-brand mb-2">Verify Identity</h2>
          <p className="text-gray-500">
            {step === 1 ? "We need to verify your phone number to secure your agent account." : "Enter the 6-digit code sent to your phone."}
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={sendOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 bg-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? "Sending OTP..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP Code</label>
              <input
                type="text"
                required
                maxLength="6"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
              <p className="text-xs text-gray-400 text-center mt-2">Test OTP is 123456</p>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-md disabled:bg-blue-300 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? "Verifying..." : "Verify & Continue"} <ArrowRight size={20} />
            </button>

            <button 
              type="button"
              onClick={() => setStep(1)}
              className="w-full mt-2 text-gray-500 font-medium hover:text-brand transition"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}