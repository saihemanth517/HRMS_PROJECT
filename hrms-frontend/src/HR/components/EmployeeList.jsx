import { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../services/hrApi";
import EmployeeForm from "./EmployeeForm";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadEmployees = async () => {
    try {
      const res = await fetchEmployees();
      setEmployees(res.data);
    } catch (err) {
      alert("Failed to fetch employees");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      try {
        await deleteEmployee(id);
        loadEmployees();
      } catch (err) {
        alert("Failed to delete employee");
      }
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="card shadow p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Employees</h4>
        <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(true);
            setEditData(null);
          }}
        >
          + Add Employee
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
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
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => {
                    setShowForm(true);
                    setEditData(emp);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <EmployeeForm
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
          onSaved={loadEmployees}
          editData={editData}
        />
      )}
    </div>
  );
}

export default EmployeeList;
