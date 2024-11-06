import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useReactResponsive } from "../../../hooks/hooks";
import Header from "../../Header/Header.styled";
import LeftSidebar from "../../LeftSidebar/LeftSidebar.styled";
import Modals from "../../Modals/Modals";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.styled";

const SharedLayout = () => {
  const { isOnDesktop } = useReactResponsive();

  return (
    <>
      {isOnDesktop && <LeftSidebar />}
      <Header />
      <Modals />

      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
