import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ⭐ ADMIN CREDENTIALS
const ADMIN_EMAIL = "satvikkethinedi@gmail.com";
const ADMIN_PASS = "Pandu@2006";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ⭐ COMPLETE LOGIN HANDLER
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // ⭐ ADMIN LOGIN CHECK
    if (
      cleanEmail === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASS
    ) {
      localStorage.setItem("currentUser", cleanEmail);
      localStorage.setItem("currentRole", "admin");
      alert("Logged in as Admin!");
      navigate("/admin");
      return;
    }

    // ⭐ USER LOGIN CHECK
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail &&
        u.password === password
    );

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem("currentUser", cleanEmail);
    localStorage.setItem("currentRole", "user");

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "40px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "30px", fontWeight: "700" }}>
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background: "#1e1bff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          Login
        </button>

        {/* Register */}
        <p style={{ fontSize: "15px" }}>
          New user?{" "}
          <Link
            to="/register"
            style={{ fontWeight: "bold", color: "#1e1bff", textDecoration: "none" }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
