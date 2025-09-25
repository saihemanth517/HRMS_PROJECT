import api from "../../components/api"; // Axios instance

// Employee APIs
export const fetchEmployees = () => api.get("/employees"); // Get all employees
export const addEmployee = (data) => api.post("/employees", data); // Add employee
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data); // Update employee
export const deleteEmployee = (id) => api.delete(`/employees/${id}`); // Delete employee

// Attendance APIs
export const fetchAttendance = () => api.get("/attendance");
export const fetchAttendanceByEmployee = (id) => api.get(`/attendance/employee/${id}`);
export const markAttendance = (data) => api.post("/attendance", null, { params: data });
export const updateAttendance = (id, status) => api.put(`/attendance/${id}`, null, { params: { status } });
export const deleteAttendance = (id) => api.delete(`/attendance/${id}`);

// Payroll APIs
export const fetchPayroll = () => api.get("/payroll");

// HR Reports API
export const fetchReportsSummary = () => api.get("/reports/summary"); 

// Performance APIs
export const fetchPerformanceReviews = () => api.get("/performance");

// ===== Training APIs =====

// Training Programs
export const fetchAllTrainings = () => api.get("/training"); 
export const createTraining = (data) => api.post("/training", data);
export const updateTraining = (id, data) => api.put(`/training/${id}`, data);
export const deleteTraining = (id) => api.delete(`/training/${id}`);

// Employee Training Enrollment
export const fetchEmployeeTrainings = () => api.get("/training/enroll"); 
export const enrollEmployee = (data) => api.post("/training/enroll", data);
export const updateEnrollment = (id, data) => api.put(`/training/enroll/${id}`, data);
export const fetchEmployeeSpecificTrainings = (employeeId) => api.get(`/training/employee/${employeeId}`);
export const fetchTrainingParticipants = (trainingId) => api.get(`/training/training/${trainingId}/participants`);