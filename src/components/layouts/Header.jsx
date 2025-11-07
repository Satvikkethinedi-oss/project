import React from "react";
import { Sun, Menu } from "lucide-react";

export default function Header() {
  return (
    <div style={{ height: 64, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Menu size={18} />
        <strong>ERP Demo</strong>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Sun size={16} />
        <div>Admin</div>
      </div>
    </div>
  );
}
