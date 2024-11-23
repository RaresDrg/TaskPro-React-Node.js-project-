import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/hooks";

// *intrebare: {repalce: true} ?

const RestrictedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default RestrictedRoutes;
