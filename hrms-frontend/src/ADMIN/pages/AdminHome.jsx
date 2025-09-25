import { useEffect, useState } from "react";
import { FaUsers, FaUserShield, FaHistory, FaMoneyBillWave, FaClipboardList, FaChartBar } from "react-icons/fa";
import StatsCard from "../components/StatsCard"; 
import { getAllEmployees } from "../services/employeeService";
import { getAllAuditLogs } from "../services/auditService";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const [employees, setEmployees] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const empRes = await getAllEmployees();
        setEmployees(empRes.data);

        const auditRes = await getAllAuditLogs();
        setAuditLogs(auditRes.data);
      } catch (err) {
        console.error("Failed to load admin data", err);
      }
    };
    loadData();
  }, []);

  const totalEmployees = employees.length;
  const totalAdmins = employees.filter((e) => e.role === "ADMIN").length;
  const totalHR = employees.filter((e) => e.role === "HR").length;
  const totalAuditLogs = auditLogs.length;

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Welcome, Admin!</h2>
      <p className="text-muted mb-5">Here's an overview of the system.</p>

      {/* Stats Cards */}
      <div className="row g-4">
        <div className="col-md-3">
          <StatsCard
            title="Total Employees"
            value={totalEmployees}
            icon={<FaUsers size={30} />}
            bgColor="bg-primary"
          />
        </div>
        <div className="col-md-3">
          <StatsCard
            title="Admins"
            value={totalAdmins}
            icon={<FaUserShield size={30} />}
            bgColor="bg-danger"
          />
        </div>
        <div className="col-md-3">
          <StatsCard
            title="HR Users"
            value={totalHR}
            icon={<FaUsers size={30} />}
            bgColor="bg-success"
          />
        </div>
        <div className="col-md-3">
          <StatsCard
            title="Audit Logs"
            value={totalAuditLogs}
            icon={<FaHistory size={30} />}
            bgColor="bg-warning"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-5">
        <h4>Quick Actions</h4>
        <div className="row g-3 mt-3">
          
          <div className="col-md-4">
            <Link to="employees" className="text-decoration-none">
              <div className="card text-center shadow-sm hover-shadow">
                <div className="card-body">
                  <FaClipboardList size={40} className="mb-2 text-primary" />
                  <h5 className="card-title">Manage Employees</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="audit" className="text-decoration-none">
              <div className="card text-center shadow-sm hover-shadow">
                <div className="card-body">
                  <FaHistory size={40} className="mb-2 text-warning" />
                  <h5 className="card-title">View Audit Logs</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="reports" className="text-decoration-none">
              <div className="card text-center shadow-sm hover-shadow">
                <div className="card-body">
                  <FaChartBar size={40} className="mb-2 text-info" />
                  <h5 className="card-title">Generate Reports</h5>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
