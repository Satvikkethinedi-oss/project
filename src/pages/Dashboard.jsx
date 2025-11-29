import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Dashboard() {
  const [certs, setCerts] = useState([]);
  const email = localStorage.getItem("currentUser");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("certificates")) || {};
    setCerts(all[email] || []);
  }, []);

  const getDaysLeft = (expiry) => {
    if (!expiry) return "No expiry";

    const today = new Date();
    const exp = new Date(expiry);
    const diff = exp - today;

    if (isNaN(diff)) return "Invalid date";

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days >= 0
      ? `${days} days left`
      : `Expired ${Math.abs(days)} days ago`;
  };

  const deleteCert = (index) => {
    const all = JSON.parse(localStorage.getItem("certificates")) || {};
    const updated = [...certs];
    updated.splice(index, 1);
    all[email] = updated;

    localStorage.setItem("certificates", JSON.stringify(all));
    setCerts(updated);
  };

  const chartData = [
    { name: "Valid", value: certs.filter((c) => new Date(c.expiry) > new Date()).length },
    { name: "Expired", value: certs.filter((c) => new Date(c.expiry) <= new Date()).length },
  ];

  const colors = ["#4CAF50", "#FF5252"];

  return (
    <div style={{
      display: "flex",
      padding: "40px",
      gap: "40px",
      background: "#f3f4f8",
      minHeight: "100vh"
    }}>
      
      {/* LEFT SECTION */}
      <div style={{ width: "60%" }}>
        <h1 style={{
          fontSize: "36px",
          fontWeight: "800",
          marginBottom: "10px",
        }}>
          Your Certifications
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Total Certificates: <b>{certs.length}</b>
        </p>

        {certs.map((c, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "20px",
            marginBottom: "25px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            transition: "0.3s",
          }}>
            <h2 style={{ marginBottom: "10px" }}>{c.name.toUpperCase()}</h2>

            <p><b>Issuer:</b> {c.issuer}</p>
            <p><b>Expiry:</b> {c.expiry || "None"}</p>

            <p style={{
              marginTop: "10px",
              color: new Date(c.expiry) > new Date() ? "green" : "red",
              fontWeight: "bold"
            }}>
              {getDaysLeft(c.expiry)}
            </p>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => window.open(c.fileURL)}
                style={{
                  padding: "12px 25px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#4f46e5",
                  color: "white",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                View Certificate
              </button>

              <button
                onClick={() => deleteCert(i)}
                style={{
                  padding: "12px 25px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#ff4444",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div style={{
        width: "35%",
        background: "rgba(255,255,255,0.7)",
        borderRadius: "20px",
        padding: "25px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        height: "400px"
      }}>
        <h2 style={{ textAlign: "center" }}>Certificate Overview</h2>

        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={colors[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
