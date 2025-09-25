import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { setToken, removeToken } from './auth';
import { UserContext } from './UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Login API
      const response = await api.post('/auth/login', { email, password });
      const { token, role } = response.data;

      if (!token) throw new Error('Invalid token received');

      // Save token and role
      setToken(token);
      localStorage.setItem('role', role);

      // Fetch user immediately
      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);

      // Redirect based on role
      switch (role) {
        case 'ADMIN': navigate('/dashboard/admin'); break;
        case 'HR': navigate('/dashboard/hr'); break;
        case 'FINANCE': navigate('/dashboard/finance'); break;
        case 'EMPLOYEE': navigate('/dashboard/employee'); break;
        default: navigate('/');
      }

    } catch (err) {
      removeToken(); // clear token on error
      alert(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f2f6fc' }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%', borderRadius: '12px' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">HRMS Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-bold"
            style={{ background: 'linear-gradient(90deg,#0d6efd,#6610f2)', border: 'none' }}
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-decoration-none">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
