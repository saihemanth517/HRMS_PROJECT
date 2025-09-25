import api from "../../components/api";

// Get all payrolls
export const getAllPayrolls = async () => {
  try {
    const res = await api.get("/payrolls");
    return res.data;
  } catch (err) {
    console.error("Error fetching payrolls:", err);
    return [];
  }
};

// Mark payroll as paid
export const markPayrollPaid = async (payrollId) => {
  try {
    const res = await api.put(`/payrolls/pay/${payrollId}`);
    return res.data;
  } catch (err) {
    console.error("Error marking payroll paid:", err);
    return null;
  }
};

// Get summary report (total salary, attendance, performance)
export const getReportsSummary = async () => {
  try {
    const res = await api.get("/reports/summary");
    return res.data;
  } catch (err) {
    console.error("Error fetching reports summary:", err);
    return {};
  }
};


export const generatePayroll = async (employeeId, month, bonus = 0, deductions = 0) => {
  const response = await api.post(`/payrolls/generate/${employeeId}`, null, {
    params: { month, bonus, deductions }
  });
  return response.data;
};
// Get all employees
export const getAllEmployees = async () => {
  try {
    const res = await api.get("/employees");
    return res.data;
  } catch (err) {
    console.error("Error fetching employees:", err);
    return [];
  }
};
