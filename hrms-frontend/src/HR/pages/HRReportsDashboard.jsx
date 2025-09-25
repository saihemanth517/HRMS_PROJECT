import { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { fetchReportsSummary } from "../services/hrApi"; // <- use centralized HR API

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function HRReportsDashboard() {
  const [reports, setReports] = useState({
    totalSalary: 0,
    attendanceSummary: {},
    performanceSummary: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await fetchReportsSummary();
        setReports(res.data);
      } catch (err) {
        alert("Failed to load reports");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading reports...</div>;

  const { totalSalary, attendanceSummary, performanceSummary } = reports;

  // Pie chart for attendance
  const attendanceData = {
    labels: Object.keys(attendanceSummary),
    datasets: [
      {
        label: "Attendance",
        data: Object.values(attendanceSummary),
        backgroundColor: ["#198754", "#dc3545", "#ffc107"], // Present, Absent, On Leave
      },
    ],
  };

  // Bar chart for performance
  const performanceData = {
    labels: Object.keys(performanceSummary),
    datasets: [
      {
        label: "Average Score",
        data: Object.values(performanceSummary),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">HR Reports Dashboard</h2>

      <div className="row g-4 mb-4">
        {/* Total Payroll */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex align-items-center">
              <FaMoneyBillWave className="text-success me-3 fs-2" />
              <div>
                <h6 className="card-title">Total Payroll</h6>
                <h5 className="card-text">${totalSalary.toLocaleString()}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Pie Chart */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h6 className="card-title text-center">Attendance Summary</h6>
            <Pie data={attendanceData} />
          </div>
        </div>

        {/* Performance Bar Chart */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h6 className="card-title text-center">Performance Summary</h6>
            <Bar
              data={performanceData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HRReportsDashboard;
