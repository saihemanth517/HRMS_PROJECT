import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/EmployeeSidebar";
import Topbar from "../components/Topbar"; // reuse same Topbar or make EmployeeTopbar if needed

function EmployeeDashboard() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <EmployeeSidebar />

      {/* Main Section */}
      <div className="flex-grow-1 bg-light" style={{ minHeight: "100vh" }}>
        <Topbar /> {/* or EmployeeTopbar */}
        
        <div className="p-4" style={{ minHeight: "calc(100vh - 56px)" }}>
          <Outlet /> {/* Nested employee pages will render here */}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
