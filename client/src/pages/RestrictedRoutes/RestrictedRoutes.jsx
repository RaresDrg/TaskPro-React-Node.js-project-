import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/hooks";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner.styled";

// *intrebare: {repalce: true} ?

const RestrictedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
};

export default RestrictedRoutes;
