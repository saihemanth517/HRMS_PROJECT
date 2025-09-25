// src/ADMIN/pages/RoleManagement.jsx
import { useEffect, useState } from "react";
import api from "../../components/api";
import { Table, Button, Form } from "react-bootstrap";

function RoleManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle role update
  const updateRole = async (id, newRole) => {
    try {
      const employee = employees.find((emp) => emp.id === id);
      const updatedEmployee = { ...employee, role: newRole };

      await api.put(`/employees/${id}`, updatedEmployee);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? updatedEmployee : emp))
      );
      alert("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role.");
    }
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <h2>Role Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <Form.Select
                  value={emp.role}
                  onChange={(e) => updateRole(emp.id, e.target.value)}
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="HR">HR</option>
                  <option value="FINANCE">Finance</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RoleManagement;
