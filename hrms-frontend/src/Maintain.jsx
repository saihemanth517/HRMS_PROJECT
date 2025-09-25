import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';

// Role-based dashboards
  // import AdminDashboard from './pages/Dashboard/AdminDashboard';
  import AdminDashboard from "./ADMIN/pages/AdminDashboard";
import HRDashboard from './HR/pages/HRDashboard';
  // import FinanceDashboard from './pages/Dashboard/FinanceDashboard';
  // import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';
  import EmployeeDashboard from "./Employee/pages/EmployeeDashboard";


// HR Nested Pages
import HRHomeStatsPage from './HR/pages/HRHomeStatsPage';
import EmployeeListPage from './HR/pages/EmployeeListPage';
import AttendanceListPage from './HR/pages/AttendanceListPage';
import PayrollPage from './HR/pages/PayrollPage';
import JobPostingsPage from './HR/pages/JobPostingsPage';
import ApplicationsPage from './HR/pages/ApplicationsPage';
import OnboardingPage from './HR/pages/OnboardingPage';
import HRReportsDashboard from './HR/pages/HRReportsDashboard'; 

// Leave Management
import LeaveApprovalPage from './HR/pages/LeaveApprovalPage';
// **Performance Management**
import PerformanceReviewPage from './HR/pages/PerformanceReviewPage';
import TrainingDashboard from './HR/pages/TrainingDashboard';

import EmployeeHomeStatsPage from './Employee/pages/EmployeeHomeStatsPage';
import EmployeeProfilePage from './Employee/pages/EmployeeProfilePage';
import EmployeeAttendancePage from './Employee/pages/EmployeeAttendancePage';
import EmployeeLeavePage from "./Employee/pages/EmployeeLeavePage";
import EmployeePayrollPage from "./Employee/pages/EmployeePayroll";

import FinanceDashboard from './FINANCE/pages/FinanceDashboard';
import EmployeeTrainingDashboard from "./Employee/pages/EmployeeTrainingDashboard";



import EmployeeManagement from "./ADMIN/pages/EmployeeManagement";
import RoleManagement from "./ADMIN/pages/RoleManagement";
import ReportsPage from "./ADMIN/pages/ReportsPage";
import AuditLogs from "./ADMIN/pages/AuditLogs";
import AdminHome from "./ADMIN/pages/AdminHome";


function Maintain() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* HR Dashboard with nested pages */}
        <Route
          path="/dashboard/hr"
          element={
            <PrivateRoute allowedRoles={['HR']}>
              <HRDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<HRHomeStatsPage />} /> {/* Default page */}
          <Route path="employees" element={<EmployeeListPage />} />
          <Route path="attendance" element={<AttendanceListPage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="training" element={<TrainingDashboard />} />
          {/* Recruitment Pages */}
          <Route path="/dashboard/hr/jobs" element={<JobPostingsPage />} />
<Route path="/dashboard/hr/applications/:jobId" element={<ApplicationsPage />} />
<Route path="/dashboard/hr/onboarding/:employeeId" element={<OnboardingPage />} />
          <Route path="reports" element={<HRReportsDashboard />} />


 {/* Performance Management */}
  <Route path="performance" element={<PerformanceReviewPage />} />
            {/* Leave Management */}
  <Route path="leaves/approval" element={<LeaveApprovalPage />} />
  


          </Route>

        {/* Finance Dashboard */}
        <Route
          path="/dashboard/finance"
          element={
            <PrivateRoute allowedRoles={['FINANCE']}>
              <FinanceDashboard />
            </PrivateRoute>
          }
        />

        {/* Employee Dashboard with nested pages */}
<Route
  path="/dashboard/employee"
  element={
    <PrivateRoute allowedRoles={['EMPLOYEE']}>
      <EmployeeDashboard />
    </PrivateRoute>
  }
>
  {/* Default page */}
  <Route index element={<EmployeeHomeStatsPage />} />

  {/* Future pages */}
<Route path="attendance" element={<EmployeeAttendancePage />} />
  <Route path="payroll" element={<EmployeePayrollPage />} />
<Route path="leaves" element={<EmployeeLeavePage />} />
<Route path="profile" element={<EmployeeProfilePage />} />
<Route path="trainings" element={<EmployeeTrainingDashboard />} />

</Route>


        {/* Admin Dashboard */}
       <Route
  path="/dashboard/admin"
  element={
    <PrivateRoute allowedRoles={['ADMIN']}>
      <AdminDashboard />
    </PrivateRoute>
  }
>
  <Route path="employees" element={<EmployeeManagement />} />
<Route path="roles" element={<RoleManagement />} />
<Route path="reports" element={<ReportsPage />} />
  <Route path="audit" element={<AuditLogs />} />
  <Route index element={<AdminHome />} />
</Route>



        {/* Profile page */}
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={['ADMIN', 'HR', 'FINANCE', 'EMPLOYEE']}>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default Maintain;
