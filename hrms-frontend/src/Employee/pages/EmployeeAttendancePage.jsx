// src/Employee/pages/EmployeeAttendancePage.jsx
import React, { useContext, useEffect, useState } from "react";
import { Table, Spinner, Alert, Form } from "react-bootstrap";
import { UserContext } from "../../components/UserContext";
import { getAttendanceByEmployee } from "../services/attendanceService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function EmployeeAttendancePage() {
  const { user } = useContext(UserContext);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth());

  // Fetch employee attendance
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAttendanceByEmployee(user.id);
        // Sort by date descending
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAttendanceRecords(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch attendance.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  // Filter records by selected month
 const filteredRecords = attendanceRecords;


  // Prepare chart data
  const chartData = ["PRESENT", "ABSENT", "ON_LEAVE"].map(status => ({
    status,
    count: filteredRecords.filter(r => r.status === status).length
  }));

  return (
    <div className="p-4">
      <h3 className="mb-4">My Attendance</h3>

      {/* Month filter */}
      <Form.Select
        className="mb-4"
        value={monthFilter}
        onChange={(e) => setMonthFilter(e.target.value)}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <option key={i} value={i}>
            {new Date(0, i).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </Form.Select>

      {/* Attendance table */}
      <div className="mb-4">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center">No records found.</td>
              </tr>
            ) : (
              filteredRecords.map(r => (
                <tr key={r.id}>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Attendance chart */}
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#4e73df" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
