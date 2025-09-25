import { useEffect, useState } from "react";
import { fetchAttendance, deleteAttendance } from "../services/hrApi";
import AttendanceForm from "../components/AttendanceForm";

function AttendanceListPage() {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadAttendance = async () => {
    try {
      const res = await fetchAttendance();
      setRecords(res.data);
    } catch (err) {
      alert("Failed to fetch attendance");
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      try {
        await deleteAttendance(id);
        loadAttendance();
      } catch (err) {
        alert("Failed to delete attendance");
      }
    }
  };

  return (
    <div className="card shadow p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Attendance</h4>
        <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(true);
            setEditData(null);
          }}
        >
          + Mark Attendance
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.employee.name}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => {
                    setShowForm(true);
                    setEditData(r);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <AttendanceForm
          onClose={() => {
            setShowForm(false);
            setEditData(null);
            loadAttendance();
          }}
          editData={editData}
        />
      )}
    </div>
  );
}

export default AttendanceListPage;
