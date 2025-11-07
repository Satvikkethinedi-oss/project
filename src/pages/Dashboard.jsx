import CertificationCard from "../components/ui/CertificationCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const data = [
    { title: "AWS Developer", issuer: "Amazon", expiryDate: "2026-01-01" },
    { title: "Azure Fundamentals", issuer: "Microsoft", expiryDate: "2025-06-15" }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Certifications</h1>
      <Link to="/add">+ Add Certification</Link>

      {data.map((cert, i) => (
        <CertificationCard key={i} cert={cert} />
      ))}
    </div>
  );
}
