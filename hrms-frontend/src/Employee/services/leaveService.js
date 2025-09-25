import api from "../../components/api";

// Request leave (employee is determined by JWT, no employeeId needed)
export const requestLeave = async (leaveRequest) => {
  try {
    const res = await api.post("/leaves", leaveRequest);
    return res.data;
  } catch (err) {
    console.error("Error requesting leave:", err);
    throw err;
  }
};

// Get leaves for logged-in employee
export const getMyLeaves = async () => {
  try {
    const res = await api.get("/leaves/my"); // backend must handle this route
    return res.data;
  } catch (err) {
    console.error("Error fetching leaves:", err);
    return [];
  }
};
