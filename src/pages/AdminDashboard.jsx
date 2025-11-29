import "./AdminDashboard.css";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <p>Manage all certifications here.</p>
      <Link to="/users">
  <button className="btn">Manage Users</button>
</Link>

    </div>
  );
}
