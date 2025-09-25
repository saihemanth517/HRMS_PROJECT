// src/ADMIN/components/AdminSidebar.jsx
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
      <h3 className="mb-4">Admin</h3>
      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/admin">Dashboard Home</Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="employees">Employee Management</Link>
        </li>

        <li className="nav-item mb-2">
  <Link className="nav-link text-white" to="roles">
    Role Management
  </Link>
</li>


        <li className="nav-item mb-2">
  <Link className="nav-link text-white" to="reports">
    Reports & Analytics
  </Link>
</li>


        <li className="nav-item mb-2">
  <Link className="nav-link text-white" to="audit">
    Audit Logs
  </Link>
</li>


      </ul>
    </div>
  );
}

export default AdminSidebar;
