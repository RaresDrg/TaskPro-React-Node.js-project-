import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/hooks";

const RestrictedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default RestrictedRoutes;
