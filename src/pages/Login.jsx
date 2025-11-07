import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim()) navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <button>Login</button>
      </form>
    </div>
  );
}
