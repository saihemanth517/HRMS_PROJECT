import api from "../../components/api";

// Job Posting APIs
export const fetchJobs = () => api.get("/recruitment/jobs");
export const createJob = (data) => api.post("/recruitment/jobs", data);
export const updateJob = (id, data) => api.put(`/recruitment/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/recruitment/jobs/${id}`);

// Applications APIs
export const applyJob = (jobId, formData) =>
  api.post(`/recruitment/jobs/${jobId}/apply`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const fetchApplications = (jobId) => api.get(`/recruitment/jobs/${jobId}/applications`);
export const updateApplicationStatus = (id, status) =>
  api.put(`/recruitment/applications/${id}/status`, null, { params: { status } });

// Onboarding APIs
export const generateOnboardingTasks = (employeeId) =>
  api.post(`/recruitment/onboarding/${employeeId}`);

export const fetchOnboardingTasks = (employeeId) =>
  api.get(`/recruitment/onboarding/${employeeId}`);

export const completeOnboardingTask = (taskId) =>
  api.put(`/recruitment/onboarding/${taskId}/complete`);
