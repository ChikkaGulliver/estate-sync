import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // 🔥 Clear inputs when page loads
  useEffect(() => {
    setForm({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCred.user;

      // Save role + details
      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: serverTimestamp(),
      });

      // 🔥 clear fields
      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      navigate("/dashboard");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="register-page">
      <form
        className="register-card"
        onSubmit={handleRegister}
        autoComplete="off"
      >
        <h2>Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          autoComplete="off"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          autoComplete="off"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          autoComplete="new-password"
          onChange={handleChange}
        />

        {/* ROLE SELECT */}
        <div className="role-box">
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={form.role === "user"}
              onChange={handleChange}
            />
            User
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="agent"
              checked={form.role === "agent"}
              onChange={handleChange}
            />
            Agent
          </label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}