import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function HRDashboard() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", width: "100vw" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light" style={{ minHeight: "100vh" }}>
        <Topbar />
        <div className="p-4" style={{ minHeight: "calc(100vh - 56px)" }}>
          <Outlet /> {/* Nested pages will render here */}
        </div>
      </div>
    </div>
  );
}

export default HRDashboard;
