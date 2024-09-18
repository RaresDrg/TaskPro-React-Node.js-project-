import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import useResponsive from "../../../hooks/useResponsive";
import Header from "../../Header/Header.styled";
import LeftSidebar from "../../LeftSidebar/LeftSidebar.styled";
import Modals from "../Modals/Modals";

const SharedLayout = () => {
  const { isOnDesktop } = useResponsive();

  return (
    <>
      {isOnDesktop && <LeftSidebar />}
      <Header />
      <Modals />

      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
