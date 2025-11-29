import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (password.trim().length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f3f5", // Minimal grey matte
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "35px",
          borderRadius: "10px",
          background: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)", // Soft subtle shadow
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontSize: "26px",
            fontWeight: "600",
            color: "#222",
          }}
        >
          Login
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            fontSize: "15px",
            outline: "none",
          }}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            fontSize: "15px",
            outline: "none",
          }}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            background: "#4f46e5",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "#4338ca")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "#4f46e5")
          }
        >
          Login
        </button>
      </div>
    </div>
  );
}
