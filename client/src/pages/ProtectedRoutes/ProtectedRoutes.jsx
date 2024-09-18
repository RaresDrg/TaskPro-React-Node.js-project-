import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  // todo: => fara refreshing ?
  // todo: => test: {repalce: true}

  return shouldRedirect ? <Navigate to={"/login"} /> : <Outlet />;
};

export default ProtectedRoutes;
