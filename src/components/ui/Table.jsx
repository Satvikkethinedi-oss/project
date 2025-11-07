import React from "react";

export default function Table({ columns, data, actions }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={i} style={{ textAlign: "left", padding: 8 }}>{c}</th>
          ))}
          {actions && <th style={{ padding: 8 }}>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id} style={{ borderTop: "1px solid #f3f4f6" }}>
            {columns.map((c, i) => (
              <td key={i} style={{ padding: 8 }}>
                {row[c] ?? ""}
              </td>
            ))}
            {actions && <td style={{ padding: 8 }}>{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
