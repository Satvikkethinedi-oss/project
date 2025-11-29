import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCertification() {
  const [cert, setCert] = useState({
    title: "",
    issuer: "",
    expiryDate: "",
    file: ""
  });

  const navigate = useNavigate();
  const user = localStorage.getItem("currentUser");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cert.title || !cert.issuer || !cert.expiryDate || !cert.file) {
      alert("Please fill all fields!");
      return;
    }

    const allCerts = JSON.parse(localStorage.getItem("certificates")) || {};
    if (!allCerts[user]) allCerts[user] = [];

    allCerts[user].push(cert);

    localStorage.setItem("certificates", JSON.stringify(allCerts));

    alert("Certificate added!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Add Certificate</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Certificate Title"
          onChange={(e) => setCert({ ...cert, title: e.target.value })}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Issuer"
          onChange={(e) => setCert({ ...cert, issuer: e.target.value })}
          style={inputStyle}
        />

        <label>Expiry Date</label>
        <input
          type="date"
          onChange={(e) => setCert({ ...cert, expiryDate: e.target.value })}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Certificate URL"
          onChange={(e) => setCert({ ...cert, file: e.target.value })}
          style={inputStyle}
        />

        <button style={btnStyle}>Add Certificate</button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "300px",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btnStyle = {
  padding: "10px 20px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
