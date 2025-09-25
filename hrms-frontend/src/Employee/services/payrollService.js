import api from "../../components/api";

export const getPayrollByEmployee = async (employeeId) => {
  try {
    const res = await api.get(`/payrolls/employee/${employeeId}`);
    return res.data; // <-- return only the data array
  } catch (err) {
    console.error("Error fetching payroll: ", err);
    return []; // fallback to empty array
  }
};
