import api from "../../components/api"; // your axios setup

// Get all audit logs
export const getAllAuditLogs = () => api.get("/admin/audit");

// Optionally, add a log (if you plan to create logs from frontend)
export const addAuditLog = (log) => api.post("/admin/audit", log);
