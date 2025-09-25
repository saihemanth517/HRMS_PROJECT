import { useEffect, useState } from "react";
import { fetchEmployees, updateEmployee } from "../services/hrApi"; // we'll reuse employee API
import PayrollForm from "../components/PayrollForm";

function PayrollPage() {
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

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleEdit = (emp) => {
    setEditData(emp);
    setShowForm(true);
  };

  return (
    <div className="card shadow p-3 mb-4">
      <h4>Payroll Management</h4>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Salary</th>
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
              <td>${emp.salary || 0}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(emp)}
                >
                  Edit Salary
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <PayrollForm
          editData={editData}
          onClose={() => {
            setShowForm(false);
            setEditData(null);
            loadEmployees();
          }}
        />
      )}
    </div>
  );
}

export default PayrollPage;
