import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = res.user;

      // USER FLOW
      if (form.role === "user") {
        await setDoc(doc(db, "users", user.uid), {
          name: form.name,
          email: form.email,
          role: "user",
        });

        navigate("/dashboard");
      }

      // AGENT FLOW → go to phone verification
      if (form.role === "agent") {
        navigate("/verify-phone", {
          state: {
            uid: user.uid,
            name: form.name,
            email: form.email,
          },
        });
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <h2>Create Account</h2>
        <p className="subtitle">Join EstateSync</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>

          <button type="submit">Register</button>

        </form>

        <p className="login-link">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>

      </div>
    </div>
  );
}