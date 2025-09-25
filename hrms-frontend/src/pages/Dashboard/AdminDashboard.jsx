import React from 'react';

function AdminDashboard() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
      }}
    >
      <header
        style={{
          padding: '20px 40px',
          backgroundColor: '#007bff', // Bootstrap primary color
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Admin Dashboard
      </header>

      <main
        style={{
          flexGrow: 1,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            flex: 1,
          }}
        >
          <h3>System Overview</h3>
          <p>View overall system stats, active users, and performance metrics.</p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            flex: 1,
          }}
        >
          <h3>Admin Actions</h3>
          <p>Manage roles, permissions, and high-level configurations here.</p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
