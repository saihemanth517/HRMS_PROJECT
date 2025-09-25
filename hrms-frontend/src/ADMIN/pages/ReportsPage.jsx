// src/ADMIN/pages/ReportsPage.jsx
import { useEffect, useState } from "react";
import api from "../../components/api";
import StatsCard from "../../HR/components/StatsCard";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ReportsPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/reports/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const COLORS = ["#28a745", "#dc3545", "#ffc107"];

  // Convert attendance data for recharts
  const attendanceData = Object.entries(summary.attendanceSummary || {}).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  // Convert performance data for recharts
  const performanceData = Object.entries(summary.performanceSummary || {}).map(
    ([status, avgScore]) => ({
      name: status,
      score: avgScore,
    })
  );

  return (
    <div>
      <h2>Admin Reports & Analytics</h2>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <StatsCard
            title="Total Payroll"
            value={`₹${summary.totalSalary}`}
            icon="💰"
            bgColor="bg-success"
          />
        </Col>
      </Row>

      {/* Attendance Pie Chart */}
      <Row className="mb-4">
        <Col md={6}>
          <h5>Attendance Distribution</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {attendanceData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>

        {/* Performance Bar Chart */}
        <Col md={6}>
          <h5>Performance Summary</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </div>
  );
}

export default ReportsPage;
