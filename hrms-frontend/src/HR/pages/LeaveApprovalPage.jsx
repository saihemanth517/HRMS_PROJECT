import { useEffect, useState } from "react";
import { getAllLeaves, approveLeave, rejectLeave } from "../services/leaveApi";

function LeaveApprovalPage() {
  const [leaves, setLeaves] = useState([]);

  const loadLeaves = async () => {
    try {
      const res = await getAllLeaves();
      setLeaves(res.data);
    } catch (err) {
      alert("Failed to fetch leaves");
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      loadLeaves();
    } catch (err) {
      alert("Failed to approve leave");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      loadLeaves();
    } catch (err) {
      alert("Failed to reject leave");
    }
  };

  return (
    <div className="card p-4">
      <h3>Leave Approval</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employee?.id}</td>
              <td>{leave.employee?.name}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === "PENDING" && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleApprove(leave.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleReject(leave.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveApprovalPage;
