function StatsCard({ title, value, icon, bgColor }) {
  return (
    <div className={`card text-white ${bgColor} mb-3`} style={{ maxWidth: '18rem' }}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <h5 className="card-title">{title}</h5>
          <h3>{value}</h3>
        </div>
        <div style={{ fontSize: '2rem' }}>{icon}</div>
      </div>
    </div>
  );
}

export default StatsCard;
