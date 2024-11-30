import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/hooks";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return !isLoggedIn ? <Navigate to={"/login"} /> : <Outlet />;
};

export default ProtectedRoutes;
