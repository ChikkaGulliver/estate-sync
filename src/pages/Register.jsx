import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created");
      navigate("/login");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.card}>
        <h2>Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", marginTop: "100px" },
  card: { padding: "30px", background: "#fff", boxShadow: "0 0 10px #ccc" },
  input: { display: "block", margin: "10px 0", padding: "10px", width: "250px" },
  button: { padding: "10px", width: "100%", background: "#0ea5e9", color: "#fff", border: "none" }
};