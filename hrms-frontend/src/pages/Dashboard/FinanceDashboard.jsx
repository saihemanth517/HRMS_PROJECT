import React from 'react';

function FinanceDashboard() {
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
          backgroundColor: '#28a745', // Bootstrap success color
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Finance Dashboard
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
          <h3>Payroll Overview</h3>
          <p>View salary processing, deductions, and finance reports.</p>
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
          <h3>Financial Approvals</h3>
          <p>Approve expense claims, reimbursements, and other finance tasks.</p>
        </div>
      </main>
    </div>
  );
}

export default FinanceDashboard;
