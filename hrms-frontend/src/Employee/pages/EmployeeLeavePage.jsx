import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Table, Alert, Spinner } from "react-bootstrap";
import { requestLeave, getMyLeaves } from "../services/leaveService";

export default function EmployeeLeavePage() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [type, setType] = useState("SICK");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const data = await getMyLeaves();
      setLeaveRequests(data);
    } catch (err) {
      setError("Failed to load leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      setError("Please fill all fields.");
      return;
    }
    try {
      await requestLeave({ type, startDate, endDate, reason });
      setType("SICK");
      setStartDate("");
      setEndDate("");
      setReason("");
      fetchLeaves();
    } catch (err) {
      setError("Failed to submit leave request.");
    }
  };

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <div className="p-4">
      <h3 className="mb-4">My Leave Requests</h3>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Leave Type</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="SICK">Sick</option>
            <option value="CASUAL">Casual</option>
            <option value="EARNED">Earned</option>
            <option value="OTHER">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">Submit Leave</Button>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date Range</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">No leave requests yet.</td>
            </tr>
          ) : leaveRequests.map(leave => (
            <tr key={leave.id}>
              <td>{leave.type}</td>
              <td>{leave.startDate} → {leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>
                <span className={`badge ${
                  leave.status === "PENDING" ? "bg-warning" :
                  leave.status === "APPROVED" ? "bg-success" : "bg-danger"
                }`}>
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
