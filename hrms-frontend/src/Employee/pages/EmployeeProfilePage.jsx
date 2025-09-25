// src/Employee/pages/EmployeeProfilePage.jsx
import React, { useEffect, useState } from "react";
import api from "../../components/api";
import { Card, Table, Form, Button, Spinner, Alert } from "react-bootstrap";

export default function EmployeeProfilePage() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get("/employees/me"); // fetch logged-in employee
        setEmployee(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  // Update password separately
  const handlePasswordChange = async () => {
    if (!password) return;

    setUpdating(true);
    setMessage(null);
    setError(null);

    try {
      await api.put(`/employees/${employee.id}/change-password`, { newPassword: password });
      setMessage("Password updated successfully!");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Failed to update password.");
    } finally {
      setUpdating(false);
    }
  };

  // Update profile info
  const handleUpdateProfile = async () => {
    setUpdating(true);
    setMessage(null);
    setError(null);

    try {
      const res = await api.put(`/employees/me`, employee);
      setEmployee(res.data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="p-4 text-center">
        <Spinner animation="border" />
      </div>
    );

  if (!employee)
    return <Alert variant="danger" className="p-4">Profile not found.</Alert>;

  return (
    <Card className="m-4 p-4">
      <Card.Header>
        <h3>My Profile</h3>
      </Card.Header>
      <Card.Body>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Table borderless>
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>
                <Form.Control
                  type="text"
                  value={employee.name}
                  onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>
                <Form.Control
                  type="email"
                  value={employee.email}
                  onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Password:</strong></td>
              <td>
                <Form className="d-flex gap-2">
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    onClick={handlePasswordChange}
                    disabled={updating || !password}
                  >
                    {updating ? "Updating..." : "Change"}
                  </Button>
                </Form>
              </td>
            </tr>
            <tr>
              <td><strong>Role:</strong></td>
              <td>
                <Form.Select
                  value={employee.role || "EMPLOYEE"}
                  onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="FINANCE">Finance</option>
                  <option value="HR">HR</option>
                </Form.Select>
              </td>
            </tr>
            <tr>
              <td><strong>Department:</strong></td>
              <td>
                <Form.Control
                  type="text"
                  value={employee.department || ""}
                  onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Position:</strong></td>
              <td>
                <Form.Control
                  type="text"
                  value={employee.position || ""}
                  onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Salary:</strong></td>
              <td>
                <Form.Control
                  type="number"
                  value={employee.salary || 0}
                  onChange={(e) => setEmployee({ ...employee, salary: parseFloat(e.target.value) })}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Date of Joining:</strong></td>
              <td>
                <Form.Control
                  type="date"
                  value={employee.dateOfJoining || ""}
                  onChange={(e) => setEmployee({ ...employee, dateOfJoining: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Status:</strong></td>
              <td>
                <Form.Control
                  type="text"
                  value={employee.status || ""}
                  onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <Button variant="success" onClick={handleUpdateProfile} disabled={updating}>
          {updating ? "Saving..." : "Save Changes"}
        </Button>
      </Card.Body>
    </Card>
  );
}
