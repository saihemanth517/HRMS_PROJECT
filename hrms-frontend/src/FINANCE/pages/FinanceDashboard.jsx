import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert, Row, Col, Card } from "react-bootstrap";
import {
  getAllPayrolls,
  markPayrollPaid,
  getReportsSummary,
  getAllEmployees,
  generatePayroll
} from "../services/financeService";
import { FaMoneyBillWave, FaUsers, FaChartLine } from "react-icons/fa";

export default function FinanceDashboard() {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentMonth = new Date().toISOString().slice(0, 7); // "2025-09" format

  const fetchData = async () => {
    setLoading(true);
    try {
      const payrollData = await getAllPayrolls();
      setPayrolls(payrollData);
      const employeesData = await getAllEmployees();
      setEmployees(employeesData);
      const summaryData = await getReportsSummary();
      setSummary(summaryData);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkPaid = async (payrollId) => {
    await markPayrollPaid(payrollId);
    fetchData();
  };

  const handleGeneratePayroll = async (employeeId) => {
    try {
      await generatePayroll(employeeId, currentMonth);
      fetchData();
    } catch (err) {
      setError("Failed to generate payroll");
    }
  };

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", width: "100vw" }}>
      <div className="flex-grow-1 d-flex flex-column p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h2 className="mb-4">Finance Dashboard</h2>

        {/* Summary Cards */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <FaMoneyBillWave size={40} className="text-success me-3" />
                <div>
                  <Card.Title>Total Payroll</Card.Title>
                  <Card.Text>₹{summary.totalSalary?.toFixed(2) || 0}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <FaUsers size={40} className="text-primary me-3" />
                <div>
                  <Card.Title>Attendance Records</Card.Title>
                  <Card.Text>
                    {Object.entries(summary.attendanceSummary || {}).map(
                      ([status, count]) => `${status}: ${count}`
                    ).join(", ")}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <FaChartLine size={40} className="text-warning me-3" />
                <div>
                  <Card.Title>Performance Avg</Card.Title>
                  <Card.Text>
                    {Object.entries(summary.performanceSummary || {}).map(
                      ([status, score]) => `${status}: ${score.toFixed(2)}`
                    ).join(", ")}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Payroll Table */}
        <Card className="shadow-sm flex-grow-1 d-flex flex-column mb-4">
          <Card.Body className="flex-grow-1 d-flex flex-column">
            <h5 className="mb-3">All Payrolls</h5>
            <div className="flex-grow-1 overflow-auto">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Month</th>
                    <th>Base Salary</th>
                    <th>Bonus</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map((p) => (
                    <tr key={p.id}>
                      <td>{p.employee?.name}</td>
                      <td>{p.month}</td>
                      <td>₹{p.basicSalary.toFixed(2)}</td>
                      <td>₹{(p.bonus || 0).toFixed(2)}</td>
                      <td>₹{(p.deductions || 0).toFixed(2)}</td>
                      <td>₹{p.netSalary.toFixed(2)}</td>
                      <td>
                        {p.status === "PAID" ? (
                          <span className="text-success">Paid</span>
                        ) : (
                          <span className="text-warning">Pending</span>
                        )}
                      </td>
                      <td>
                        {p.status === "UNPAID" && (
                          <Button size="sm" onClick={() => handleMarkPaid(p.id)}>
                            Mark Paid
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Generate Payroll Section */}
        <Card className="shadow-sm flex-grow-0">
          <Card.Body>
            <h5 className="mb-3">Generate Payroll for Current Month ({currentMonth})</h5>
            {employees.map((emp) => {
              const payrollExists = payrolls.some(
                (p) => p.employee.id === emp.id && p.month === currentMonth
              );
              return !payrollExists && (
                <div key={emp.id} className="mb-2">
                  <span className="me-3">{emp.name}</span>
                  <Button size="sm" onClick={() => handleGeneratePayroll(emp.id)}>
                    Generate Payroll
                  </Button>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
