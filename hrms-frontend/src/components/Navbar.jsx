import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from './auth';
import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import ProfilePage from '../pages/ProfilePage';

function Navbar() {
  const navigate = useNavigate();
  const token = getToken();
const { user, setUser, loading } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('role');
    setUser(null); // clear context on logout
    navigate('/login');
  };

  const renderDashboardLink = () => {
if (loading) return null; // wait until user info is loaded
    switch (user.role) {
      case 'ADMIN': return <Link className="nav-link" to="/dashboard/admin">Dashboard</Link>;
      case 'HR': return <Link className="nav-link" to="/dashboard/hr">Dashboard</Link>;
      case 'FINANCE': return <Link className="nav-link" to="/dashboard/finance">Dashboard</Link>;
      case 'EMPLOYEE': return <Link className="nav-link" to="/dashboard/employee">Dashboard</Link>;
      default: return null;
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand fw-bold">HRMS</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto align-items-center">
              {token && renderDashboardLink()}
              {user && token ? (
                <li className="nav-item dropdown ms-3">
                  <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    {user.name}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: '250px' }}>
                    <li><strong>Name:</strong> {user.name}</li>
                    <li><strong>Email:</strong> {user.email}</li>
                    <li><strong>Role:</strong> {user.role}</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={() => setShowProfile(true)}>
                        Update Profile
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Profile popup */}
      {showProfile && <ProfilePage onClose={() => setShowProfile(false)} />}
    </>
  );
}

export default Navbar;
