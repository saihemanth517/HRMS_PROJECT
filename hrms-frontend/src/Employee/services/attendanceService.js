// src/Employee/services/attendanceService.js
import api from "../../components/api";




// Fetch attendance for a specific employee
export const getAttendanceByEmployee = async (employeeId) => {
  try {
    const res = await api.get(`/attendance/${employeeId}`);
    return res.data; // ✅ Return the array directly
  } catch (err) {
    console.error("Error fetching attendance:", err);
    return [];
  }
};

