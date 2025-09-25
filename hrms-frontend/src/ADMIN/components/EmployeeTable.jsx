import React from "react";
import { Button, Table } from "react-bootstrap";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Role</th>
          <th>Email</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.department}</td>
            <td>{emp.role}</td>
            <td>{emp.email}</td>
            <td>{emp.salary}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                onClick={() => onEdit(emp)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(emp.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
