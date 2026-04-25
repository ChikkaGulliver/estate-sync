import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Building2, 
  Clock, 
  MapPin,
  Search,
  Sparkles
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden bg-[#0f172a]">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-32 -mt-32"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content - Simple English */}
            <div className="lg:w-3/5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
                <Sparkles size={14} /> The Easiest Way to Handle Property Work
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                Property Work? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Done From Home.
                </span>
              </h1>
              
              <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                No more standing in long lines or visiting government offices multiple times. We connect you with local experts who handle your paperwork while you relax at home.
              </p>

              <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 shadow-2xl shadow-blue-600/30">
                  Start My Request <ArrowRight size={22} />
                </Link>
                <Link to="/services" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg transition-all backdrop-blur-md">
                  See What We Do
                </Link>
              </div>
            </div>

            {/* Right Side - Clear Benefits */}
            <div className="lg:w-2/5 w-full">
              <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-sm">
                <h4 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
                   Why choose us?
                </h4>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 flex-shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-white font-bold">No Waiting in Lines</p>
                      <p className="text-slate-400 text-sm">Our agents visit the government offices so you don't have to.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 flex-shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-white font-bold">Safe & Verified</p>
                      <p className="text-slate-400 text-sm">We only work with trusted local experts who know the rules perfectly.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0">
                      <Search size={24} />
                    </div>
                    <div>
                      <p className="text-white font-bold">Easy Tracking</p>
                      <p className="text-slate-400 text-sm">See the progress of your application live on your phone.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* THREE SIMPLE STEPS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
           <div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Local Field Experts</h3>
              <p className="text-slate-600 leading-relaxed text-lg">We send experts to handle your Sale Deed, Khata, or Patta work directly at the local offices.</p>
           </div>
           <div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Total Fraud Protection</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Don't get cheated. Our legal team checks every property document before you pay or sign anything.</p>
           </div>
           <div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Honest Fees</h3>
              <p className="text-slate-600 leading-relaxed text-lg">No hidden costs. You pay a small fixed fee of ₹499. No more paying extra "commission" to middlemen.</p>
           </div>
        </div>
      </section>

    </div>
  );
}