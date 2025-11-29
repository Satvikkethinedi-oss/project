import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [certsByUser, setCertsByUser] = useState({});
  const [totalCerts, setTotalCerts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("currentRole");
    if (role !== "admin") {
      alert("Not authorized. Admins only.");
      navigate("/");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedCerts = JSON.parse(localStorage.getItem("certificates")) || {};

    setUsers(storedUsers);
    setCertsByUser(storedCerts);

    let count = 0;
    Object.values(storedCerts).forEach((list) => {
      count += list.length;
    });
    setTotalCerts(count);
  }, [navigate]);

  const deleteUser = (email) => {
    if (!window.confirm(`Delete user ${email} and all their certificates?`)) {
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedCerts = JSON.parse(localStorage.getItem("certificates")) || {};

    const updatedUsers = storedUsers.filter((u) => u.email !== email);
    delete storedCerts[email];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("certificates", JSON.stringify(storedCerts));

    setUsers(updatedUsers);
    setCertsByUser(storedCerts);
  };

  const deleteCertificate = (email, index) => {
    if (!window.confirm("Delete this certificate?")) return;

    const storedCerts = JSON.parse(localStorage.getItem("certificates")) || {};
    if (!storedCerts[email]) return;

    storedCerts[email].splice(index, 1);

    localStorage.setItem("certificates", JSON.stringify(storedCerts));
    setCertsByUser(storedCerts);

    let count = 0;
    Object.values(storedCerts).forEach((list) => {
      count += list.length;
    });
    setTotalCerts(count);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentRole");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <h1 style={styles.heading}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <p style={styles.summary}>
        Total Users: <strong>{users.length}</strong> | Total Certificates:{" "}
        <strong>{totalCerts}</strong>
      </p>

      <div style={styles.main}>
        {users.length === 0 ? (
          <p>No users registered yet.</p>
        ) : (
          users.map((u) => {
            const list = certsByUser[u.email] || [];
            return (
              <div key={u.email} style={styles.userCard}>
                <div style={styles.userHeader}>
                  <div>
                    <h2 style={{ margin: 0 }}>{u.email}</h2>
                    <p style={{ margin: "4px 0", color: "#555" }}>
                      Certificates: {list.length}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteUser(u.email)}
                    style={styles.deleteUserBtn}
                  >
                    Delete User
                  </button>
                </div>

                {list.length === 0 ? (
                  <p style={{ color: "#777" }}>No certificates for this user.</p>
                ) : (
                  list.map((c, index) => (
                    <div key={index} style={styles.certCard}>
                      <h3 style={{ marginBottom: 6 }}>{c.title || c.name}</h3>
                      <p style={styles.certText}>
                        <strong>Issuer:</strong> {c.issuer}
                      </p>
                      <p style={styles.certText}>
                        <strong>Expiry:</strong> {c.expiryDate}
                      </p>
                      {c.file && (
                        <a
                          href={c.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.viewLink}
                        >
                          View Certificate
                        </a>
                      )}

                      <button
                        onClick={() => deleteCertificate(u.email, index)}
                        style={styles.deleteCertBtn}
                      >
                        Delete Certificate
                      </button>
                    </div>
                  ))
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "#f3f4f6",
    minHeight: "100vh",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "32px",
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "#ef4444",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  summary: {
    marginBottom: "20px",
    fontSize: "16px",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  userCard: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  userHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  deleteUserBtn: {
    padding: "8px 14px",
    background: "#b91c1c",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  certCard: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
  },
  certText: {
    margin: "2px 0",
  },
  viewLink: {
    display: "inline-block",
    marginTop: "8px",
    marginRight: "10px",
    color: "white",
    background: "#4f46e5",
    padding: "6px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
  },
  deleteCertBtn: {
    padding: "6px 12px",
    background: "#ef4444",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};
