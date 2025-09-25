import React, { useContext, useEffect, useState } from "react";
import { FaCalendarCheck, FaMoneyBillWave, FaUmbrellaBeach, FaUser } from "react-icons/fa";
import StatsCard from "../components/StatsCard";
import { getAttendanceByEmployee } from "../services/attendanceService";
import { getPayrollByEmployee } from "../services/payrollService";
import { getMyLeaves } from "../services/leaveService";
import { UserContext } from "../../components/UserContext";

export default function EmployeeHomeStatsPage() {
  const { user } = useContext(UserContext);
  const [employeeId, setEmployeeId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  // Get employee ID from context
  useEffect(() => {
    if (user && (user.id || user.employeeId)) {
      setEmployeeId(user.id || user.employeeId);
    }
  }, [user]);

  // Fetch all employee-related data
  useEffect(() => {
    if (!employeeId) return;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const [att, pay, lv] = await Promise.all([
          getAttendanceByEmployee(employeeId),
          getPayrollByEmployee(employeeId),
          getMyLeaves(), // <-- JWT-based leave fetching
        ]);

        // Flatten employee.id for easier filtering
        const flattenedAttendance = (att || []).map(a => ({
          ...a,
          employeeId: a.employee?.id,
        }));

        const flattenedLeaves = (lv || []).map(l => ({
          ...l,
          employeeId: l.employee?.id,
        }));

        const flattenedPayrolls = (pay || []).map(p => ({
          ...p,
          employeeId: p.employee?.id,
        }));

        setAttendanceRecords(flattenedAttendance);
        setPayrolls(flattenedPayrolls);
        setLeaves(flattenedLeaves);
      } catch (err) {
        console.error("Error fetching employee home data:", err);
        setError("Failed to load data. Check console for details.");
        setAttendanceRecords([]);
        setPayrolls([]);
        setLeaves([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [employeeId]);

  // Compute stats
  const now = new Date();
  const currentMonth = now.getMonth();

  const presentThisMonth = attendanceRecords.filter(a => {
    try {
      const d = new Date(a.date);
      return a.status === "PRESENT" && d.getMonth() === currentMonth && d.getFullYear() === now.getFullYear();
    } catch {
      return false;
    }
  }).length;

  const totalPresent = attendanceRecords.filter(a => a.status === "PRESENT").length;
  const pendingLeaves = leaves.filter(l => l.status === "PENDING").length;
  const approvedLeaves = leaves.filter(l => l.status === "APPROVED").length;
  const latestPayslip = payrolls.length > 0 ? payrolls[0] : null;

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-danger">Error: {error}</div>;

  return (
    <div className="p-4">
      <h3 className="mb-4">Welcome {user?.name || "Employee"}</h3>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-3">
          <StatsCard
            title="Attendance (This Month)"
            value={`${presentThisMonth} days`}
            subtitle={`Total present: ${totalPresent}`}
            icon={<FaCalendarCheck />}
          />
        </div>

        <div className="col-12 col-md-3">
          <StatsCard
            title="Latest Payslip"
            value={latestPayslip ? `₹${latestPayslip.netSalary}` : "N/A"}
            subtitle={latestPayslip ? `${latestPayslip.month} — ${latestPayslip.paid ? "Paid" : "Pending"}` : ""}
            icon={<FaMoneyBillWave />}
          />
        </div>

        <div className="col-12 col-md-3">
          <StatsCard
            title="Leaves"
            value={`Approved: ${approvedLeaves}`}
            subtitle={`Pending: ${pendingLeaves}`}
            icon={<FaUmbrellaBeach />}
          />
        </div>

        <div className="col-12 col-md-3">
          <StatsCard
            title="Profile"
            value={user?.name || "—"}
            subtitle={user?.role || "Employee"}
            icon={<FaUser />}
          />
        </div>
      </div>

      {/* Recent Leaves */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Recent Leave Applications</h5>
          {leaves.length === 0 ? (
            <div>No leaves found.</div>
          ) : (
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.slice(0, 5).map(l => (
                  <tr key={l.id}>
                    <td>{l.startDate} → {l.endDate}</td>
                    <td>{l.reason}</td>
                    <td>{l.days || "-"}</td>
                    <td>{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Payroll history */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Recent Payroll History</h5>
          {payrolls.length === 0 ? (
            <div>No payroll records.</div>
          ) : (
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Gross</th>
                  <th>Deductions</th>
                  <th>Net</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.slice(0, 6).map(p => (
                  <tr key={p.id}>
                    <td>{p.month}</td>
                    <td>₹{p.grossSalary}</td>
                    <td>₹{p.deductions}</td>
                    <td>₹{p.netSalary}</td>
                    <td>{p.paid ? "Paid" : "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
