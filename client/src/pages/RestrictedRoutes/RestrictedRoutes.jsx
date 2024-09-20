import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RestrictedRoutes = () => {
  const { isLoggedIn } = useAuth();

  // todo: => test: {repalce: true}

  return isLoggedIn ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default RestrictedRoutes;
