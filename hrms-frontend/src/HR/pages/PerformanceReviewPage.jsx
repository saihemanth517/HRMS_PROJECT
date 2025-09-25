import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { fetchEmployees } from "../services/hrApi";
import {
  fetchPerformanceReviews,
  addPerformanceReview,
  updatePerformanceReview,
  deletePerformanceReview,
} from "../services/performanceService";

function PerformanceReviewPage() {
  const [employees, setEmployees] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: "",
    score: "",
    comments: "",
    status: "COMPLETED",
  });
  const [error, setError] = useState("");

  // Fetch employees and reviews
  useEffect(() => {
    async function fetchData() {
      try {
        const empRes = await fetchEmployees();
        setEmployees(empRes.data);

        const reviewRes = await fetchPerformanceReviews();

        // Map employeeId to employeeName for display
        const mappedReviews = reviewRes.data.map((r) => {
          const employee = empRes.data.find((e) => e.id === r.employeeId);
          return {
            ...r,
            employeeName: employee ? employee.name : r.employeeId,
          };
        });

        setReviews(mappedReviews);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleShowModal = (review = null) => {
    setSelectedReview(review);
    if (review) {
      setFormData({
        employeeId: review.employeeId,
        score: review.score,
        comments: review.comments,
        status: review.status,
      });
    } else {
      setFormData({ employeeId: "", score: "", comments: "", status: "COMPLETED" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Keep employeeId as string (UUID)
      const payload = { ...formData };

      if (selectedReview) {
        await updatePerformanceReview(selectedReview.id, payload);
      } else {
        await addPerformanceReview(payload);
      }

      // Refresh reviews
      const reviewRes = await fetchPerformanceReviews();
      const mappedReviews = reviewRes.data.map((r) => {
        const employee = employees.find((e) => e.id === r.employeeId);
        return {
          ...r,
          employeeName: employee ? employee.name : r.employeeId,
        };
      });
      setReviews(mappedReviews);
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setError("Failed to save review");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deletePerformanceReview(id);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete review");
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-4">
      <h2>Performance Reviews</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="mb-3" onClick={() => handleShowModal()}>
        Add Review
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Score</th>
            <th>Comments</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id}>
              <td>{r.employeeName}</td>
              <td>{r.score}</td>
              <td>{r.comments}</td>
              <td>{r.status}</td>
              <td>{r.reviewDate}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(r)}
                >
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedReview ? "Edit Review" : "Add Review"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Employee</Form.Label>
              <Form.Select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                disabled={!!selectedReview} // Prevent changing employee for existing review
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
                name="score"
                value={formData.score}
                onChange={handleChange}
                min={0}
                max={10}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit">{selectedReview ? "Update" : "Add"} Review</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PerformanceReviewPage;
