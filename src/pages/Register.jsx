import "../register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // steps:
  // 1 = email/phone
  // 2 = OTP
  // 3 = password
  // 4 = agent ID (only for agent)
  const [step, setStep] = useState(1);

  // role
  const [role, setRole] = useState("user");

  // fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agentId, setAgentId] = useState("");

  // back
  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // send OTP
  const sendOtp = () => {
    if (!email || !phone) {
      alert("Enter email & phone");
      return;
    }
    alert("OTP Sent (Demo: 1234)");
    setStep(2);
  };

  // verify OTP
  const verifyOtp = () => {
    if (otp === "1234") {
      setStep(3);
    } else {
      alert("Wrong OTP");
    }
  };

  // password submit
  const setPass = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (role === "user") {
      // USER → instant account
      localStorage.setItem("userRole", "user");

      alert("User Account Created ✅");
      navigate("/dashboard");
    } else {
      // AGENT → needs verification
      alert("Agent account created. Enter Agent ID to activate.");
      setStep(4);
    }
  };

  // agent verification
  const verifyAgent = () => {
    if (agentId === "AGENT123") {
      localStorage.setItem("userRole", "agent");
      localStorage.setItem("agentStatus", "active");

      alert("Agent Verified & Activated ✅");
      navigate("/dashboard");
    } else {
      alert("Invalid Agent ID. Contact support.");
    }
  };

  // (optional) commission helper
  const calculateCommission = (amount) => {
    const commission = amount * 0.1;
    const agentEarning = amount - commission;
    return { commission, agentEarning };
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/* HEADER */}
        <h1>
          {role === "user" ? "Create User Account" : "Create Agent Account"}
        </h1>
        <p>Join EstateSync to manage real estate services</p>

        {/* ROLE TABS */}
        <div className="role-tabs">
          <button
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            User
          </button>

          <button
            className={role === "agent" ? "active" : ""}
            onClick={() => setRole("agent")}
          >
            Agent
          </button>
        </div>

        {/* STEP INDICATOR */}
        <div className="steps-indicator">
          Step {step} of {role === "agent" ? 4 : 3}
        </div>

        {/* STEP 1: EMAIL + PHONE */}
        {step === 1 && (
          <>
            <input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button onClick={sendOtp}>Send OTP</button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="btn-group">
              <button className="back" onClick={goBack}>
                Back
              </button>

              <button onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>
          </>
        )}

        {/* STEP 3: PASSWORD */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="btn-group">
              <button className="back" onClick={goBack}>
                Back
              </button>

              <button onClick={setPass}>
                Submit
              </button>
            </div>
          </>
        )}

        {/* STEP 4: AGENT ID */}
        {step === 4 && role === "agent" && (
          <>
            <input
              placeholder="Enter Agent ID (Demo: AGENT123)"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            />

            <div className="btn-group">
              <button className="back" onClick={goBack}>
                Back
              </button>

              <button onClick={verifyAgent}>
                Verify & Activate
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}