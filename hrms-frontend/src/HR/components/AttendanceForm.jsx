import { useState, useEffect } from "react";
import { markAttendance, updateAttendance, fetchEmployees } from "../services/hrApi";

function AttendanceForm({ onClose, editData }) {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: new Date().toISOString().split("T")[0],
    status: "PRESENT",
  });

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchEmployees();
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };
    loadEmployees();

    if (editData) {
      setFormData({
        employeeId: editData.employee.id,
        date: editData.date,
        status: editData.status.toUpperCase(),
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employeeId) {
      alert("Please select an employee");
      return;
    }

    const payload = {
      employeeId: formData.employeeId,
      date: formData.date,
      status: formData.status,
    };

    try {
      if (editData) {
        await updateAttendance(editData.id, payload.status);
      } else {
        await markAttendance(payload);
      }
      onClose();
    } catch (err) {
      console.error("Attendance error:", err);
      alert("Failed to save attendance. Make sure employee exists and your role allows it.");
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editData ? "Edit" : "Mark"} Attendance</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <select
                name="employeeId"
                className="form-select mb-2"
                value={formData.employeeId}
                onChange={handleChange}
                required
                disabled={!!editData}
              >
                <option value="">Select Employee</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>

              <input
                name="date"
                type="date"
                className="form-control mb-2"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={!!editData}
              />

              <select
                name="status"
                className="form-select mb-2"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="ON_LEAVE">On Leave</option>
              </select>

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

export default AttendanceForm;
