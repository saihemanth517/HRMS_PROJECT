import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '220px' }}>
      <h3 className="mb-4">HRMS</h3>
      <ul className="nav flex-column">

        {/* HR Modules */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/hr">Dashboard Home</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="employees">Employees</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="attendance">Attendance</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="payroll">Payroll</Link>
        </li>
 <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="performance">
            Performance Management
          </Link>
        </li>
   

<li className="nav-item mb-2">
  <Link className="nav-link text-white" to="leaves/approval">
    Leave Approval
  </Link>
</li>

 <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/hr/training">
            Training Management
          </Link>
        </li>


        <hr className="bg-white" />

        {/* Recruitment Module */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="jobs">
            Recruitment and Onboarding
          </Link>
        </li>

        {/* Reports */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="reports">
            Reports & Analytics
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
