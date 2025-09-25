import React, { useEffect, useState } from "react";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import EmployeeTable from "../components/EmployeeTable";
import { Button, Modal, Form } from "react-bootstrap";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    role: "EMPLOYEE",
    salary: "",
    password: "", // added password
  });

  // Load employees
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, form);
      } else {
        await addEmployee(form);
      }
      setShowModal(false);
      resetForm();
      loadEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setForm(emp);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      department: "",
      email: "",
      role: "EMPLOYEE",
      salary: "",
      password: "", // reset password
    });
    setEditingEmployee(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Employee Management</h2>
      <Button onClick={() => setShowModal(true)}>+ Add Employee</Button>

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingEmployee ? "Edit Employee" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Department</Form.Label>
              <Form.Control
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option>EMPLOYEE</option>
                <option>HR</option>
                <option>FINANCE</option>
                <option>ADMIN</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
