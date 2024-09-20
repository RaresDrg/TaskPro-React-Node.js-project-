import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  // todo: => test: {repalce: true}

  return !isLoggedIn ? <Navigate to={"/login"} /> : <Outlet />;
};

export default ProtectedRoutes;
