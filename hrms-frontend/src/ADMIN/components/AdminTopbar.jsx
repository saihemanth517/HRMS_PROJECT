// src/ADMIN/components/AdminTopbar.jsx
import { useContext } from "react";
import { UserContext } from "../../components/UserContext";

function AdminTopbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-4">
      <span className="navbar-brand">Admin Dashboard</span>
      <div className="ms-auto">
        {user && <span className="fw-bold">{user.name} ({user.role})</span>}
      </div>
    </nav>
  );
}

export default AdminTopbar;
