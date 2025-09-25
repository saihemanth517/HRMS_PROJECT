import { useEffect, useState } from 'react';
import api from './api';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        alert('Cannot fetch users');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div
      className="d-flex justify-content-center"
      style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f8f9fa', padding: '20px' }}
    >
      <div className="w-75 p-4" style={{ maxWidth: '900px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}>
        <h2 className="mb-4 text-center">Dashboard</h2>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
