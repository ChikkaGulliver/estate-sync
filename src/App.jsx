import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceForm from "./pages/ServiceForm";
import ServiceDetails from "./pages/ServiceDetails";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PhoneVerification from "./pages/PhoneVerification";
import AgentOnboarding from "./pages/AgentOnboarding";
import AdminDashboard from "./pages/AdminDashboard";


export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-form/:name" element={<ServiceForm />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-phone" element={<PhoneVerification />} />
<Route path="/agent-onboarding" element={<AgentOnboarding />} />
<Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}