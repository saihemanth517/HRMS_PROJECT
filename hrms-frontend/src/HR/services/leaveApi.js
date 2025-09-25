import api from "../../components/api"; // Axios instance with JWT

// Employee applies for leave
export const requestLeave = (leaveRequest, employeeId) =>
  api.post(`/leaves?employeeId=${employeeId}`, leaveRequest);

// HR approves a leave
export const approveLeave = (id) => api.put(`/leaves/${id}/approve`);

// HR rejects a leave
export const rejectLeave = (id) => api.put(`/leaves/${id}/reject`);

// Get all leaves for an employee
export const getLeavesByEmployee = (employeeId) =>
  api.get(`/leaves/${employeeId}`);

// HR fetch all leaves
export const getAllLeaves = () => api.get(`/leaves`);
