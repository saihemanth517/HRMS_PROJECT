import { useContext } from "react";
import { UserContext } from "../../components/UserContext";

function Topbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-4 border-bottom">
      <span className="navbar-brand">Employee Dashboard</span>
      <div className="ms-auto">
        {user && <span className="fw-bold">{user.name} ({user.role})</span>}
      </div>
    </nav>
  );
}

export default Topbar;
