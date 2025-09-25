import React, { useEffect, useState, useContext } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { UserContext } from "../../components/UserContext";
import { getPayrollByEmployee } from "../services/payrollService";

export default function EmployeePayrollPage() {
  const { user } = useContext(UserContext);
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchPayrolls = async () => {
      try {
        const data = await getPayrollByEmployee(user.id);
        // Sort by month descending (latest first)
        data.sort((a, b) => new Date(b.month) - new Date(a.month));
        setPayrolls(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch payroll records.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, [user]);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <div className="p-4">
      <h3 className="mb-4">My Payroll</h3>

      {payrolls.length === 0 ? (
        <p>No payroll records found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Month</th>
              <th>Base Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map(p => (
              <tr key={p.id}>
                <td>{p.month}</td>
                <td>₹{p.baseSalary.toFixed(2)}</td>
                <td>₹{(p.bonus || 0).toFixed(2)}</td>
                <td>₹{(p.deductions || 0).toFixed(2)}</td>
                <td>₹{(p.baseSalary + (p.bonus || 0) - (p.deductions || 0)).toFixed(2)}</td>
                <td>
                  {p.paid ? (
                    <span className="text-success">Paid</span>
                  ) : (
                    <span className="text-warning">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
