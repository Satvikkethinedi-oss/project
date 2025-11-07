export default function CertificationCard({ cert }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: 15,
      marginTop: 10,
      borderRadius: 8
    }}>
      <h2>{cert.title}</h2>
      <p><b>Issuer:</b> {cert.issuer}</p>
      <p><b>Expiry:</b> {cert.expiryDate}</p>
    </div>
  );
}
