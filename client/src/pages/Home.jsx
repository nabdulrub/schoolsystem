import { useNavigate } from "react-router-dom";
import Authentication from "../components/auth/Authentication";
import { useAuth } from "../hooks/AuthProvider";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) return navigate("/dashboard");

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <h1 className="text-center text-3xl font-extrabold mb-10">
        School System
      </h1>
      <Authentication />
    </div>
  );
};

export default Home;
