import { Link } from "react-router-dom";

function EmployeeSidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
      <h3 className="mb-4">Employee</h3>
      <ul className="nav flex-column">

        {/* Employee Modules */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/employee">
            Dashboard Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="attendance">
            My Attendance
          </Link>
        </li>
        <li className="nav-item mb-2">
  <Link className="nav-link text-white" to="payroll">
    My Payroll
  </Link>
</li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="leaves">
            My Leave Requests
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="trainings">
            My Trainings
          </Link>
        </li>

        <hr className="bg-white" />

        {/* Extra Links */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/employee/profile">My Profile</Link>

        </li>
      </ul>
    </div>
  );
}

export default EmployeeSidebar;
