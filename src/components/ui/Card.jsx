import React from "react";

export default function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, marginBottom: 12 }}>
      {title && <h3 style={{ margin: 0, marginBottom: 8 }}>{title}</h3>}
      {children}
    </div>
  );
}
