import { useState } from "react";
import { updateEmployee } from "../services/hrApi";

function PayrollForm({ editData, onClose }) {
  const [salary, setSalary] = useState(editData.salary || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(editData.id, { ...editData, salary });
      onClose();
    } catch (err) {
      alert("Failed to update salary");
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Salary for {editData.name}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                className="form-control mb-2"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary w-100">
                Update Salary
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayrollForm;
