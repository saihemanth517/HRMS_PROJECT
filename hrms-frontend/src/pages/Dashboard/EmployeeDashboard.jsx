import React from 'react';

function EmployeeDashboard() {
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
          backgroundColor: '#ffc107', // Bootstrap warning color
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Employee Dashboard
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
          <h3>My Profile & Tasks</h3>
          <p>View personal details, tasks, and upcoming deadlines.</p>
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
          <h3>Leaves & Approvals</h3>
          <p>Submit leave requests and view approvals from HR.</p>
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;
