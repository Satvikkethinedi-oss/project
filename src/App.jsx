import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCertification from "./pages/AddCertification";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddCertification />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
