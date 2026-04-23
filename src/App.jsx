import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceForm from "./pages/ServiceForm";
import Dashboard from "./pages/Dashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-form" element={<ServiceForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}