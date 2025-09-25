import { useNavigate } from 'react-router-dom';
import { getToken } from './auth';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      // If logged in, redirect to dashboard based on role
      const role = localStorage.getItem('role');
      switch(role) {
        case 'ADMIN':
          navigate('/dashboard/admin'); break;
        case 'HR':
          navigate('/dashboard/hr'); break;
        case 'FINANCE':
          navigate('/dashboard/finance'); break;
        case 'EMPLOYEE':
          navigate('/dashboard/employee'); break;
        default: break;
      }
    }
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f2f6fc', padding: '20px' }}
    >
      <div
        className="card shadow-lg p-5 text-center"
        style={{ maxWidth: '700px', width: '100%', borderRadius: '12px', backgroundColor: 'white' }}
      >
        <h1 className="mb-4 fw-bold text-primary">Welcome to HRMS</h1>
        <p className="mb-4 fs-5 text-secondary">
          Manage employees, payroll, attendance, recruitment, and performance seamlessly.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary rounded-pill px-4 py-2 fw-bold"
            style={{ background: 'linear-gradient(90deg,#0d6efd,#6610f2)', border: 'none' }}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="btn btn-success rounded-pill px-4 py-2 fw-bold"
            style={{ background: 'linear-gradient(90deg,#28a745,#20c997)', border: 'none' }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
