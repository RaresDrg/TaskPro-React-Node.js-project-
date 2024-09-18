import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RestrictedRoutes = () => {
  const { isLoggedIn } = useAuth();
  const shouldRedirect = isLoggedIn;

  // todo: => test: {repalce: true}

  return shouldRedirect ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default RestrictedRoutes;
