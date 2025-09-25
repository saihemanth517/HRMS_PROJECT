import React from "react";

export default function SummaryCard({ title, value, icon, color }) {
  return (
    <div className={`p-4 rounded shadow-md bg-white flex items-center space-x-4`}>
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
