import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('HR');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password, role });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f2f6fc' }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%', borderRadius: '12px' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">HRMS Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input 
              type="text" 
              className="form-control rounded-pill" 
              placeholder="Enter your full name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
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
          <div className="mb-3">
  <label className="form-label fw-semibold">Role</label>
  <select 
    className="form-select rounded-pill" 
    value={role} 
    onChange={e => setRole(e.target.value)}
  >
    <option value="ADMIN">ADMIN</option>
    <option value="HR">HR</option>
    <option value="FINANCE">FINANCE</option>
    <option value="EMPLOYEE">EMPLOYEE</option>
  </select>
</div>

          <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold" style={{ background: 'linear-gradient(90deg,#28a745,#20c997)', border: 'none' }}>
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
