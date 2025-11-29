import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCertification() {
  const [cert, setCert] = useState({
    name: "",
    issuer: "",
    expiry: "",
    fileURL: ""
  });

  const navigate = useNavigate();
  const user = localStorage.getItem("currentUser");

  // Convert Google Drive links automatically
  const convertDriveLink = (url) => {
    if (!url.includes("drive.google.com")) return url;

    try {
      let fileId = "";

      // Case 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      if (url.includes("/file/d/")) {
        fileId = url.split("/file/d/")[1].split("/")[0];
      }

      // Case 2: https://drive.google.com/open?id=FILE_ID
      else if (url.includes("id=")) {
        fileId = url.split("id=")[1];
      }

      // Case 3: shareable link format
      else if (url.includes("folders")) {
        alert("Folder links are not supported. Please provide a FILE link.");
        return "";
      }

      if (!fileId) return url;

      return `https://drive.google.com/file/d/${fileId}/preview`;
    } catch (err) {
      console.error("Drive link conversion failed:", err);
      return url;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let convertedURL = convertDriveLink(cert.fileURL);

    const newCert = {
      ...cert,
      fileURL: convertedURL
    };

    const allCerts = JSON.parse(localStorage.getItem("certificates")) || {};
    if (!allCerts[user]) allCerts[user] = [];

    allCerts[user].push(newCert);

    localStorage.setItem("certificates", JSON.stringify(allCerts));

    alert("Certificate added successfully!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: "auto" }}>
      <h1>Add Certificate</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Certificate Name"
          required
          onChange={(e) => setCert({ ...cert, name: e.target.value })}
        /><br /><br />

        <input
          type="text"
          placeholder="Issuer"
          required
          onChange={(e) => setCert({ ...cert, issuer: e.target.value })}
        /><br /><br />

        <input
          type="date"
          required
          onChange={(e) => setCert({ ...cert, expiry: e.target.value })}
        /><br /><br />

        <input
          type="text"
          placeholder="Google Drive File Link"
          required
          onChange={(e) => setCert({ ...cert, fileURL: e.target.value })}
        /><br /><br />

        <button style={{ padding: "10px 20px", background: "#4f46e5", color: "white" }}>
          Add Certificate
        </button>
      </form>
    </div>
  );
}
