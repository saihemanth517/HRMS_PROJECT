import React from 'react';

function HRDashboard() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',          
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        backgroundColor: '#f8f9fa', 
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '20px 40px',
          backgroundColor: '#17a2b8', // Bootstrap info color
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        HR Dashboard
      </header>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,            // Fill remaining vertical space
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
          <h3>Employee Overview</h3>
          <p>List of all employees, leaves, and performance metrics will appear here.</p>
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
          <h3>Pending Approvals</h3>
          <p>Leave requests, profile updates, and other HR approvals will appear here.</p>
        </div>
      </main>
    </div>
  );
}

export default HRDashboard;

