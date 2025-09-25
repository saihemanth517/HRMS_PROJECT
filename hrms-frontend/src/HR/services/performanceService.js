import api from "../../components/api"; // Axios instance

// 1. Get all performance reviews (HR/Manager view)
export const fetchPerformanceReviews = () => api.get("/performance");

// 2. Get reviews for a specific employee (Employee view)
export const fetchEmployeeReviews = (employeeId) =>
  api.get(`/performance/employee/${employeeId}`);

// 3. Add a new performance review (HR/Manager)
export const addPerformanceReview = (data) => api.post("/performance", data);

// 4. Update a review by ID (HR/Manager)
export const updatePerformanceReview = (id, data) => api.put(`/performance/${id}`, data);

// 5. Delete a performance review by ID (HR/Manager)
export const deletePerformanceReview = (id) => api.delete(`/performance/${id}`);