import { useState } from "react";
import "../login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    alert("Login successful (demo)");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p>Login to your account</p>

        <input
          type="text"
          placeholder="Email or Phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="extra">
          Don't have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
}