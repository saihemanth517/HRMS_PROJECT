// src/Employee/components/StatsCard.jsx
import React from "react";

export default function StatsCard({ title, value, subtitle, icon }) {
  return (
    <div className="card p-3 shadow-sm h-100">
      <div className="d-flex align-items-center">
        <div className="me-3" style={{ fontSize: 26 }}>
          {icon}
        </div>
        <div>
          <small className="text-muted">{title}</small>
          <div className="h5 mb-0">{value}</div>
          {subtitle && <small className="text-muted d-block">{subtitle}</small>}
        </div>
      </div>
    </div>
  );
}
