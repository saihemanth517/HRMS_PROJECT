import { useEffect, useState } from "react";
import {
  fetchEmployees,
  fetchAttendance,
  fetchPerformanceReviews,
} from "../services/hrApi";
import { getAllLeaves } from "../services/leaveApi"; // Leave API
import { FaUsers, FaMoneyBillWave, FaCalendarCheck } from "react-icons/fa";
import StatsCard from "../components/StatsCard";

function HRHomeStatsPage() {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [performanceRecords, setPerformanceRecords] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Employees
        const empRes = await fetchEmployees();
        setEmployees(empRes.data);

        // Attendance
        const attRes = await fetchAttendance();
        setAttendanceRecords(attRes.data);

        // Performance
        const perfRes = await fetchPerformanceReviews();
        setPerformanceRecords(perfRes.data);

        // Leaves
        const leaveRes = await getAllLeaves();
        setLeaves(leaveRes.data);
      } catch (err) {
        alert("Failed to load HR dashboard data");
      }
    };

    loadData();
  }, []);

  // Employee stats
  const totalEmployees = employees.length;
  const totalPayroll = employees.reduce((sum, e) => sum + (e.salary || 0), 0);

  // Leave stats
  const totalLeaves = leaves.filter((l) => l.status === "APPROVED").length;

  // Attendance stats
  const today = new Date().toISOString().split("T")[0];
  const todaysAttendance = attendanceRecords.filter((r) => r.date === today);
  const presentCount = todaysAttendance.filter((r) => r.status === "PRESENT")
    .length;
  const absentCount = todaysAttendance.filter((r) => r.status === "ABSENT")
    .length;
    
const leaveCount = todaysAttendance.filter((r) => r.status === "ON_LEAVE").length;

  // Employees on leave today
  const todayOnLeave = leaves.filter(
    (l) =>
      l.status === "APPROVED" &&
      today >= l.startDate &&
      today <= l.endDate
  ).length;

  // Performance stats
  const avgPerformance =
    performanceRecords.length > 0
      ? (
          performanceRecords.reduce((sum, r) => sum + (r.score || 0), 0) /
          performanceRecords.length
        ).toFixed(2)
      : 0;

  return (
    <div className="row g-3">
      <div className="col-md-3">
        <StatsCard
          title="Employees"
          value={totalEmployees}
          icon={<FaUsers />}
          bgColor="bg-primary"
        />
      </div>
      <div className="col-md-3">
        <StatsCard
          title="Payroll"
          value={`$${totalPayroll}`}
          icon={<FaMoneyBillWave />}
          bgColor="bg-success"
        />
      </div>
      <div className="col-md-3">
        <StatsCard
          title="Leaves Taken"
          value={totalLeaves}
          icon={<FaCalendarCheck />}
          bgColor="bg-warning"
        />
      </div>
      <div className="col-md-3">
        <StatsCard
          title="Today Present"
          value={presentCount}
          icon={<FaUsers />}
          bgColor="bg-info"
        />
      </div>
      <div className="col-md-3">
        <StatsCard
          title="Today Absent"
          value={absentCount}
          icon={<FaUsers />}
          bgColor="bg-danger"
        />
      </div>
      <div className="col-md-3">
        <StatsCard
  title="Today On Leave"
  value={leaveCount}
  icon={<FaUsers />}
  bgColor="bg-secondary"
/>

      </div>
      <div className="col-md-3">
        <StatsCard
          title="Avg. Performance"
          value={avgPerformance}
          icon={<FaUsers />}
          bgColor="bg-dark"
        />
      </div>
    </div>
  );
}

export default HRHomeStatsPage;
