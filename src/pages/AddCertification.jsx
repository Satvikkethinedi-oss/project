import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCertification() {
  const [cert, setCert] = useState({
    title: "",
    issuer: "",
    expiryDate: "",
    file: null
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cert);
    alert("Certification added!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Certification</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={e => setCert({...cert, title: e.target.value})} /><br /><br />
        <input type="text" placeholder="Issuer" onChange={e => setCert({...cert, issuer: e.target.value})} /><br /><br />
        <input type="date" onChange={e => setCert({...cert, expiryDate: e.target.value})} /><br /><br />
        <input type="file" onChange={e => setCert({...cert, file: e.target.files[0]})} /><br /><br />
        <button>Add</button>
      </form>
    </div>
  );
}
