import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJobs, createJob, updateJob, deleteJob } from "../services/recruitmentApi";
import JobForm from "../components/JobForm";

function JobPostingsPage() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const navigate = useNavigate();

  const loadJobs = async () => {
    try {
      const res = await fetchJobs();
      setJobs(res.data);
    } catch (err) {
      alert("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleEdit = (job) => {
    setEditJob(job);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this job?")) {
      await deleteJob(id);
      loadJobs();
    }
  };

  const handleViewApplications = (jobId) => {
    navigate(`/dashboard/hr/applications/${jobId}`);
  };

  return (
    <div className="card shadow p-3 mb-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Job Postings</h4>
        <button
          className="btn btn-success"
          onClick={() => { setShowForm(true); setEditJob(null); }}
        >
          + Create Job
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Department</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.title}</td>
              <td>{job.department}</td>
              <td>{job.location}</td>
              <td>{job.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => handleViewApplications(job.id)}
                >
                  View Applications
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <JobForm
          editData={editJob}
          onClose={() => { setShowForm(false); setEditJob(null); loadJobs(); }}
        />
      )}
    </div>
  );
}

export default JobPostingsPage;
