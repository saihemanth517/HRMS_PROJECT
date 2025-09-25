// src/ADMIN/pages/AdminDashboard.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

function AdminDashboard() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", width: "100vw" }}>
      <AdminSidebar />
      <div className="flex-grow-1 bg-light" style={{ minHeight: "100vh" }}>
        <AdminTopbar />
        <div className="p-4" style={{ minHeight: "calc(100vh - 56px)" }}>
          <Outlet /> {/* Nested admin pages render here */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
