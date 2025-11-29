import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [certs, setCerts] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("currentUser");

  // Load certificates
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("certificates")) || {};
    setCerts(all[email] || []);
  }, [email]);

  // Calculate days left
  const daysLeft = (date) => {
    if (!date) return "Invalid";
    const today = new Date();
    const expiry = new Date(date);
    const diff = expiry - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Delete certificate
  const deleteCert = (index) => {
    const all = JSON.parse(localStorage.getItem("certificates")) || {};
    all[email].splice(index, 1);
    localStorage.setItem("certificates", JSON.stringify(all));
    setCerts([...all[email]]);
  };

  // Pie chart counts
  const expiredCount = certs.filter((c) => daysLeft(c.expiryDate) < 0).length;
  const validCount = certs.length - expiredCount;

  const pieData = [
    { name: "Expired", value: expiredCount },
    { name: "Valid", value: validCount },
  ];

  const COLORS = ["#ff4d4d", "#4CAF50"];

  return (
    <div style={pageStyle}>
      {/* LEFT SECTION STARTS */}
      <div style={leftSection}>
        <h1 style={titleStyle}>Your Certifications</h1>
        <p style={totalStyle}>Total Certificates: {certs.length}</p>

        <button
          style={addBtn}
          onClick={() => navigate("/add")}
        >
          + Add Certificate
        </button>

        {/* Certificate Cards */}
        <div style={{ marginTop: "20px" }}>
          {certs.length === 0 ? (
            <p>No certificates added.</p>
          ) : (
            certs.map((c, index) => {
              const d = daysLeft(c.expiryDate);
              const expired = d < 0;

              return (
                <div key={index} style={card}>
                  <h3 style={{ textTransform: "capitalize" }}>{c.title}</h3>

                  <p><strong>Issuer:</strong> {c.issuer}</p>
                  <p><strong>Expiry:</strong> {c.expiryDate}</p>

                  <p
                    style={{
                      fontWeight: "bold",
                      color: expired ? "red" : "green",
                    }}
                  >
                    {expired ? "Expired" : `${d} days left`}
                  </p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      style={viewBtn}
                      onClick={() => window.open(c.file, "_blank")}
                    >
                      View Certificate
                    </button>

                    <button
                      style={deleteBtn}
                      onClick={() => deleteCert(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT SECTION – PIE CHART */}
      <div style={rightSection}>
        <h2 style={{ textAlign: "center" }}>Certificate Status</h2>

        <div style={chartBox}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={legend}>
          <span style={{ color: "#ff4d4d" }}>■ Expired</span>
          <span style={{ color: "#4CAF50" }}>■ Valid</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  display: "flex",
  padding: "40px",
  gap: "40px",
  background: "#f6f7fb",
};

const leftSection = {
  width: "55%",
};

const rightSection = {
  width: "45%",
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const titleStyle = {
  fontSize: "36px",
  fontWeight: "bold",
};

const totalStyle = {
  marginTop: "10px",
  fontSize: "18px",
};

const addBtn = {
  marginTop: "15px",
  background: "#4f46e5",
  color: "white",
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const viewBtn = {
  background: "#4f46e5",
  color: "white",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const deleteBtn = {
  background: "red",
  color: "white",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const chartBox = {
  width: "100%",
  height: "280px",
  marginTop: "20px",
};

const legend = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  fontSize: "16px",
  fontWeight: "bold",
};
