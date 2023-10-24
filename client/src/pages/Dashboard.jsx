import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import { useAuth } from "../hooks/AuthProvider";
import SuperAdminView from "../components/superadmin/SuperAdminView";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) return navigate("/");

  return (
    <div className="px-12">
      <Welcome role={user?.role} username={user?.username} />

      {user.role === "superadmin" && <SuperAdminView />}
    </div>
  );
};

export default Dashboard;
