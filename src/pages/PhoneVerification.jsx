import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function PhoneVerification() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const sendOtp = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha",
        { size: "invisible" },
        auth
      );

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );

      setConfirmation(result);
      alert("OTP Sent!");
    } catch (err) {
      alert(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmation.confirm(otp);

      navigate("/agent-onboarding", {
        state: {
          ...state,
          phone,
        },
      });
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth">
      <h2>Phone Verification</h2>

      <input
        placeholder="Enter Phone (+91...)"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={sendOtp}>Send OTP</button>

      <input
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify OTP</button>

      <div id="recaptcha"></div>
    </div>
  );
}