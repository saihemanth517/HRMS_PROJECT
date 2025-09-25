// src/Employee/services/employeeApi.js
import api from "../../components/api"; // your axios instance or api helper

// 1. Fetch trainings specific to logged-in employee
export const fetchEmployeeSpecificTrainings = async (employeeId) => {
  // employeeId should be a UUID string
  return await api.get(`/training/employee/${employeeId}`);
};

// 2. Update training completion status for employee
export const updateEmployeeTrainingStatus = async (employeeTrainingId, status) => {
  // employeeTrainingId = EmployeeTraining.id (Long)
  return await api.put(`/training/enroll/${employeeTrainingId}`, {
    completionStatus: status,
  });
};
