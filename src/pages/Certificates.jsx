import { useEffect, useState } from "react";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("certificates");
      if (saved) {
        setCertificates(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading certificates:", error);
    }
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>All Certificates</h1>

      {certificates.length === 0 ? (
        <p>No certificates added yet.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {certificates.map((cert, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                width: "400px",
              }}
            >
              <h3>{cert.name}</h3>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p><strong>Date:</strong> {cert.date}</p>

              <a href={cert.fileURL} target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
