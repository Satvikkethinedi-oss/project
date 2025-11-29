import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("certificates")) || [];
    setCertificates(saved);
  }, []);

  const renderDaysLeft = (expiry) => {
    if (!expiry) return "No date";
    const today = new Date();
    const exp = new Date(expiry);
    const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `${diff} days left` : "Expired";
  };

  const data = [
    {
      name: "Valid",
      value: certificates.filter((c) => {
        return new Date(c.date) >= new Date();
      }).length,
    },
    {
      name: "Expired",
      value: certificates.filter((c) => {
        return new Date(c.date) < new Date();
      }).length,
    },
  ];

  const COLORS = ["#4CAF50", "#FF5252"];

  return (
    <div
      style={{
        display: "flex",
        padding: "30px",
        gap: "30px",
        fontFamily: "Poppins",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: "40px", fontWeight: "700", marginBottom: "10px" }}>
          Your Certifications
        </h1>

        {/* ADD CERTIFICATE BUTTON */}
        <button
          onClick={() => navigate("/add")}
          style={{
            padding: "12px 20px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          + Add Certificate
        </button>

        <p style={{ fontSize: "20px", marginBottom: "20px" }}>
          <b>Total Certificates:</b> {certificates.length}
        </p>

        {/* CERTIFICATE LIST */}
        {certificates.length === 0 ? (
          <p style={{ fontSize: "18px" }}>No certificates added.</p>
        ) : (
          certificates.map((cert, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ margin: 0, textTransform: "capitalize" }}>{cert.name}</h2>
              <p><b>Issuer:</b> {cert.issuer}</p>
              <p><b>Expiry:</b> {cert.date}</p>
              <p style={{ color: "green", fontWeight: "600" }}>{renderDaysLeft(cert.date)}</p>

              <button
                onClick={() => window.open(cert.fileURL, "_blank")}
                style={{
                  marginTop: "10px",
                  padding: "10px 15px",
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Certificate
              </button>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE PANEL - VISUALIZATION */}
      <div
        style={{
          width: "450px",
          background: "white",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 4px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Certificate Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <span style={{ color: "#FF5252", marginRight: "10px" }}>■ Expired</span>
          <span style={{ color: "#4CAF50" }}>■ Valid</span>
        </div>
      </div>
    </div>
  );
}
