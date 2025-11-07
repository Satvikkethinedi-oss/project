import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{ width: 220, borderRight: "1px solid #e5e7eb", padding: 12 }}>
      <h3>ERP</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
}
