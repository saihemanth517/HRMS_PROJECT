import api from "../../components/api"; // your axios setup

export const getAllEmployees = () => api.get("/employees");
export const addEmployee = (employee) => api.post("/employees", employee);
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const updateEmployee = (id, employee) => api.put(`/employees/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
