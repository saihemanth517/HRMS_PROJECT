import React, { useEffect, useState, useContext } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { fetchEmployeeSpecificTrainings, updateEmployeeTrainingStatus } from "../services/employeeApi";
import { UserContext } from "../../components/UserContext";

function EmployeeTrainingDashboard() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return; // wait until user is loaded
    async function loadTrainings() {
      try {
        const res = await fetchEmployeeSpecificTrainings(user.id);
        setTrainings(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load trainings");
      } finally {
        setLoading(false);
      }
    }
    loadTrainings();
  }, [user]);

  const handleMarkCompleted = async (id) => {
    try {
      await updateEmployeeTrainingStatus(id, "COMPLETED");
      setTrainings(trainings.map((t) => (t.id === id ? { ...t, completionStatus: "COMPLETED" } : t)));
    } catch (err) {
      console.error(err);
      setError("Failed to update training status");
    }
  };

  if (loading || userLoading) return <Spinner animation="border" />;

  return (
    <div className="container mt-4">
      <h2>My Trainings</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Training Title</th>
            <th>Trainer</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((t) => (
            <tr key={t.id}>
              <td>{t.trainingTitle}</td>
              <td>{t.trainerName}</td>
              <td>{t.startDate}</td>
              <td>{t.endDate}</td>
              <td>{t.completionStatus}</td>
              <td>{t.score || "-"}</td>
              <td>
                {t.completionStatus !== "COMPLETED" && (
                  <Button size="sm" onClick={() => handleMarkCompleted(t.id)}>
                    Mark Completed
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeTrainingDashboard;
