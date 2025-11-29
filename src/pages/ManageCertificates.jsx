import { useEffect, useState } from "react";
import { getCertificates } from "../utils/certificateStorage";

export default function ManageCertificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    setCertificates(getCertificates()); // Load stored data
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Stored Certificates</h2>

      {certificates.length === 0 ? (
        <p>No certificates found</p>
      ) : (
        certificates.map((c, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              width: "350px",
            }}
          >
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Roll No:</strong> {c.rollNo}</p>
            <p><strong>Course:</strong> {c.course}</p>
            <p><strong>Date:</strong> {c.date}</p>
          </div>
        ))
      )}
    </div>
  );
}
