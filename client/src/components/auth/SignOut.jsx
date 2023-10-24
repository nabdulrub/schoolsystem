import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const SignOut = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    navigate(0);
  };

  return <p onClick={handleSignOut}>Sign Out</p>;
};

export default SignOut;
