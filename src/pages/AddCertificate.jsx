import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCertificate } from "../utils/certificateStorage";

export default function AddCertificate() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handleAdd = () => {
    if (!name || !rollNo || !course || !date) {
      alert("Please fill all fields!");
      return;
    }

    const newCertificate = {
      name,
      rollNo,
      course,
      date,
    };

    addCertificate(newCertificate); // Save to localStorage
    alert("Certificate added!");
    navigate("/admin/manage-certificates"); // Move to admin page
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Certificate</h2>
      
      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "10px", display: "block", padding: "8px", width: "300px" }}
      />

      <input
        placeholder="Roll Number"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        style={{ marginBottom: "10px", display: "block", padding: "8px", width: "300px" }}
      />

      <input
        placeholder="Course Name"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        style={{ marginBottom: "10px", display: "block", padding: "8px", width: "300px" }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: "20px", display: "block", padding: "8px", width: "300px" }}
      />

      <button
        onClick={handleAdd}
        style={{
          padding: "10px 20px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add Certificate
      </button>
    </div>
  );
}
