import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  MapPin, 
  Activity, 
  ArrowRight, 
  Building2, 
  Gavel, 
  ChevronRight,
  ClipboardCheck,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden bg-[#0f172a]">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] -ml-24 -mb-24"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                <Zap size={16} /> Fast-Track Your Property Paperwork
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1]">
                Your Property, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Managed by Experts.
                </span>
              </h1>
              <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
                EstateSync simplifies complex government processes. From Sale Deeds to Khata Transfers, we connect you with local experts to handle the legwork while you track progress in real-time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services" className="bg-accent hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                  Explore Services <ArrowRight size={20} />
                </Link>
                <Link to="/register" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold text-lg transition-all backdrop-blur-md">
                  Join as Agent
                </Link>
              </div>
            </div>
            
            {/* INTERACTIVE SERVICE PREVIEW CARD (Replaced Demo Boxes) */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
                <div className="bg-white rounded-[2.2rem] p-8 overflow-hidden relative">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-blue-50 px-2 py-1 rounded mb-2 inline-block">Request Status</span>
                      <h3 className="text-2xl font-bold text-slate-900">Sale Deed Registration</h3>
                      <p className="text-slate-500 text-sm">Application ID: #ES-99234</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">In Progress</div>
                  </div>

                  {/* Visual Progress Steps */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white"><ShieldCheck size={16}/></div>
                      <div className="flex-1 border-b border-gray-100 pb-2">
                        <p className="text-sm font-bold text-slate-800">Document Verification</p>
                        <p className="text-xs text-gray-500">Completed by Admin</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white"><MapPin size={16}/></div>
                      <div className="flex-1 border-b border-gray-100 pb-2">
                        <p className="text-sm font-bold text-slate-800">Agent Field Visit</p>
                        <p className="text-xs text-gray-500">Scheduled for Today, 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 opacity-40">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">3</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">Final Registration</p>
                        <p className="text-xs text-gray-500">Pending Appointment</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-slate-400 text-xs italic">Fixed platform fee: ₹499</span>
                    <button className="text-accent font-bold text-sm flex items-center gap-1">View Details <ChevronRight size={16}/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CORE VALUE PROPOSITIONS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Why EstateSync?</h2>
          <p className="text-slate-500 text-lg">We remove the chaos from Indian property management.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
              <ClipboardCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Liaison</h3>
            <p className="text-slate-500 leading-relaxed">We don't just provide info; we provide a bridge. Our agents handle the physical visits and application filing at municipal offices for you.</p>
          </div>

          <div className="group p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
              <Gavel size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Legal Verification</h3>
            <p className="text-slate-500 leading-relaxed">Avoid property scams. Get verified legal opinions and title checks from local experts before you commit to a purchase.</p>
          </div>

          <div className="group p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
              <Activity size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Live Status Updates</h3>
            <p className="text-slate-500 leading-relaxed">Know exactly where your application stands. No more calling random middlemen to ask for a status update.</p>
          </div>
        </div>
      </section>

      {/* FIXED FEE STRIP */}
      <div className="bg-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold text-white">Transparent Pricing</h4>
            <p className="text-slate-400">Quality service shouldn't be expensive.</p>
          </div>
          <div className="flex gap-12">
            <div className="text-center">
              <p className="text-accent text-3xl font-black">₹499</p>
              <p className="text-white text-xs uppercase tracking-widest opacity-60">Fixed Platform Fee</p>
            </div>
            <div className="text-center">
              <p className="text-blue-400 text-3xl font-black">3%</p>
              <p className="text-white text-xs uppercase tracking-widest opacity-60">Agent Commission</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}