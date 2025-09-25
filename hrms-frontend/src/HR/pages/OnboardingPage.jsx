import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchOnboardingTasks, completeOnboardingTask, generateOnboardingTasks } from "../services/recruitmentApi";

function OnboardingPage() {
  const { employeeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId } = location.state || {};

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await fetchOnboardingTasks(employeeId);
      setTasks(res.data);
    } catch (err) {
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) loadTasks();
  }, [employeeId]);

  const handleComplete = async (taskId) => {
    try {
      await completeOnboardingTask(taskId);
      loadTasks();
    } catch (err) {
      alert("Failed to complete task");
    }
  };

  const handleGenerateTasks = async () => {
    try {
      await generateOnboardingTasks(employeeId);
      loadTasks();
    } catch (err) {
      alert("Failed to generate tasks");
    }
  };

  return (
    <div className="card shadow p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Onboarding Tasks</h4>
        <div>
          {tasks.length === 0 && (
            <button
              className="btn btn-success btn-sm me-2"
              onClick={handleGenerateTasks}
            >
              Generate Tasks
            </button>
          )}
          {jobId && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate(`/dashboard/hr/applications/${jobId}`)}
            >
              Back to Applications
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {task.task}
              <div>
                <span
                  className={`badge me-2 ${
                    task.status === "DONE" ? "bg-success" : "bg-warning text-dark"
                  }`}
                >
                  {task.status}
                </span>
                {task.status !== "DONE" && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleComplete(task.id)}
                  >
                    Mark as Done
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OnboardingPage;
