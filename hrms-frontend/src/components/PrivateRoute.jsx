import { Navigate } from 'react-router-dom';
import { getToken } from './auth';

function PrivateRoute({ children, allowedRoles }) {
  const token = getToken();
  const role = localStorage.getItem('role'); // role stored at login

  if (!token) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but role not allowed
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
