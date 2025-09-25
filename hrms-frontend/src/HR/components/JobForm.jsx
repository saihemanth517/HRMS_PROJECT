import { useState, useEffect } from "react";
import { createJob, updateJob } from "../services/recruitmentApi";

function JobForm({ editData, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    location: "",
    status: "OPEN",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        description: editData.description || "",
        department: editData.department || "",
        location: editData.location || "",
        status: editData.status || "OPEN",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await updateJob(editData.id, formData);
      } else {
        await createJob(formData);
      }
      onClose();
    } catch (err) {
      console.error("Job save failed", err);
      alert("Failed to save job posting");
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editData ? "Edit Job" : "Create Job"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                className="form-control mb-2"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Job Description"
                className="form-control mb-2"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                className="form-control mb-2"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="form-control mb-2"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <select
                name="status"
                className="form-select mb-2"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>
              <button type="submit" className="btn btn-primary w-100">
                {editData ? "Update Job" : "Create Job"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobForm;
