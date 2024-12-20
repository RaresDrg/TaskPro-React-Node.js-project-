import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useReactResponsive } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";
import { getBoardsList } from "../../../redux/boards/operations";
import Header from "../../Header/Header.styled";
import LeftSidebar from "../../LeftSidebar/LeftSidebar.styled";
import Modals from "../../Modals/Modals";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.styled";

const SharedLayout = () => {
  const [shouldWait, setShouldWait] = useState(true);
  const { isOnDesktop } = useReactResponsive();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardsList())
      .unwrap()
      .finally(() => setShouldWait(false));
  }, []);

  if (shouldWait) return <LoadingSpinner />;

  return (
    <>
      {isOnDesktop && <LeftSidebar />}
      <Header />
      <Modals />

      <Outlet />
    </>
  );
};

export default SharedLayout;
