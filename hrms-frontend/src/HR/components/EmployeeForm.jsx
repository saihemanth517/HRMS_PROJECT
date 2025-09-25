import { useState, useEffect } from "react";
import { addEmployee, updateEmployee } from "../services/hrApi";

function EmployeeForm({ onClose, onSaved, editData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    salary: 0, // <-- added salary
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        email: editData.email,
        password: "",
        role: editData.role,
        salary: editData.salary || 0, // <-- prefill salary if available
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value, // convert salary to number
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await updateEmployee(editData.id, formData);
      } else {
        await addEmployee(formData);
      }
      onSaved();
      onClose();
    } catch (err) {
      alert("Failed to save employee");
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editData ? "Edit" : "Add"} Employee</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                className="form-control mb-2"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type="password"
                className="form-control mb-2"
                placeholder="Password (leave blank to keep)"
                value={formData.password}
                onChange={handleChange}
              />
              <select
                name="role"
                className="form-select mb-2"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="HR">HR</option>
                <option value="FINANCE">Finance</option>
                <option value="ADMIN">Admin</option>
              </select>
              <input
                name="salary"
                type="number"
                className="form-control mb-2"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn btn-primary w-100">
                {editData ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
