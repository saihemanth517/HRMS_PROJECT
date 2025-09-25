import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApplications, updateApplicationStatus } from "../services/recruitmentApi";

function ApplicationsPage() {
  const { jobId } = useParams(); // get jobId from URL
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    try {
      const res = await fetchApplications(jobId);
      setApplications(res.data);
    } catch (err) {
      alert("Failed to fetch applications");
    }
  };

  useEffect(() => {
    if (jobId) loadApplications();
  }, [jobId]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      loadApplications();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleViewOnboarding = (employeeId) => {
    navigate(`/dashboard/hr/onboarding/${employeeId}`, { state: { jobId } });
  };

  return (
    <div className="card shadow p-3 mb-4">
      <h4>Job Applications</h4>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Candidate Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.candidateName}</td>
              <td>{app.email}</td>
              <td>{app.phone}</td>
              <td>{app.status}</td>
             



              <td>
                <select
                  value={app.status}
                  className="form-select mb-1"
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                >
                  <option value="APPLIED">APPLIED</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="OFFERED">OFFERED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
                <button
                  className="btn btn-sm btn-success mt-1"
                  onClick={() => handleViewOnboarding(app.id)}
                >
                  Onboarding
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationsPage;
