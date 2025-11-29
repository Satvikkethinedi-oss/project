import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCertificate() {
  const [data, setData] = useState({
    title: "",
    issuer: "",
    expiryDate: "",
    file: ""
  });

  const navigate = useNavigate();
  const email = localStorage.getItem("currentUser");

  const handleSubmit = (e) => {
    e.preventDefault();

    const all = JSON.parse(localStorage.getItem("certificates")) || {};
    if (!all[email]) all[email] = [];

    // SAVE with correct field names
    all[email].push({
      title: data.title,
      issuer: data.issuer,
      expiryDate: data.expiryDate,
      file: data.file
    });

    localStorage.setItem("certificates", JSON.stringify(all));

    alert("Certificate Added!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Add New Certificate</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Certificate Title"
          required
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Issuer"
          required
          onChange={(e) => setData({ ...data, issuer: e.target.value })}
        />
        <br /><br />

        <input
          type="date"
          required
          onChange={(e) => setData({ ...data, expiryDate: e.target.value })}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Certificate URL"
          required
          onChange={(e) => setData({ ...data, file: e.target.value })}
        />
        <br /><br />

        <button type="submit">Save Certificate</button>
      </form>
    </div>
  );
}
