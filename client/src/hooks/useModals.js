import { useSelector } from "react-redux";
import modalsSelectors from "../redux/modals/selectors";

// todo: => poate fac o foarma mai buna cu state => modals, etc si renunt la selectors.js, din redux
const useModals = () => {
  const isBurgerMenuOpen = useSelector(modalsSelectors.selectIsBurgerMenuOpen);
  const isLogoutModalOpen = useSelector(
    modalsSelectors.selectIsLogoutModalOpen
  );
  const isEditUserModalOpen = useSelector(
    modalsSelectors.selectIsEditUserModalOpen
  );

  return {
    isBurgerMenuOpen,
    isLogoutModalOpen,
    isEditUserModalOpen,
  };
};

export default useModals;
