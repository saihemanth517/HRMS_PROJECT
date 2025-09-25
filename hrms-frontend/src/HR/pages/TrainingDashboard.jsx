// src/HR/pages/TrainingDashboard.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import {
  fetchAllTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  fetchEmployees,
  enrollEmployee,
  fetchEmployeeSpecificTrainings,
  fetchTrainingParticipants,
} from "../services/hrApi";

function TrainingDashboard() {
  const [trainings, setTrainings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    trainerName: "",
    startDate: "",
    endDate: "",
    status: "SCHEDULED",
  });
  const [enrollData, setEnrollData] = useState({ employeeId: "", trainingId: "" });
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const trainingsRes = await fetchAllTrainings();
        setTrainings(trainingsRes.data);

        const employeesRes = await fetchEmployees();
        setEmployees(employeesRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ----- Training CRUD -----
  const handleShowModal = (training = null) => {
    setSelectedTraining(training);
    if (training) {
      setFormData({ ...training });
    } else {
      setFormData({
        title: "",
        description: "",
        trainerName: "",
        startDate: "",
        endDate: "",
        status: "SCHEDULED",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTraining(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTraining) {
        await updateTraining(selectedTraining.id, formData);
      } else {
        await createTraining(formData);
      }
      const trainingsRes = await fetchAllTrainings();
      setTrainings(trainingsRes.data);
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setError("Failed to save training");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this training?")) return;
    try {
      await deleteTraining(id);
      setTrainings(trainings.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete training");
    }
  };

  // ----- Enrollment -----
  const handleShowEnrollModal = async (trainingId) => {
    setEnrollData({ employeeId: "", trainingId });
    const participantsRes = await fetchTrainingParticipants(trainingId);
    setParticipants(participantsRes.data);
    setShowEnrollModal(true);
  };

  const handleEnrollChange = (e) => {
    setEnrollData({ ...enrollData, [e.target.name]: e.target.value });
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    try {
      await enrollEmployee(enrollData);
      const participantsRes = await fetchTrainingParticipants(enrollData.trainingId);
      setParticipants(participantsRes.data);
      setEnrollData({ employeeId: "", trainingId: enrollData.trainingId });
    } catch (err) {
      console.error(err);
      setError("Failed to enroll employee");
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-4">
      <h2>HR Training Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="mb-3" onClick={() => handleShowModal()}>
        Add Training
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Trainer</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Participants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.trainerName}</td>
              <td>{t.startDate}</td>
              <td>{t.endDate}</td>
              <td>{t.status}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => handleShowEnrollModal(t.id)}
                >
                  View / Enroll
                </Button>
              </td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(t)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(t.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ----- Training Modal ----- */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTraining ? "Edit Training" : "Add Training"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trainer Name</Form.Label>
              <Form.Control
                type="text"
                name="trainerName"
                value={formData.trainerName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="SCHEDULED">SCHEDULED</option>
                <option value="ONGOING">ONGOING</option>
                <option value="COMPLETED">COMPLETED</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit">{selectedTraining ? "Update" : "Add"} Training</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ----- Enrollment Modal ----- */}
      <Modal show={showEnrollModal} onHide={() => setShowEnrollModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll Employee / Participants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEnrollSubmit} className="mb-3">
            <Form.Group>
              <Form.Label>Select Employee</Form.Label>
              <Form.Select
                name="employeeId"
                value={enrollData.employeeId}
                onChange={handleEnrollChange}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="mt-2">
              Enroll
            </Button>
          </Form>

          <h6>Participants:</h6>
          <ul>
            {participants.map((p) => (
              <li key={p.id}>
                Employee ID: {p.employeeId}, Status: {p.completionStatus}, Score: {p.score || "-"}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TrainingDashboard;
