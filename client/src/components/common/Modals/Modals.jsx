import { createPortal } from "react-dom";
import useModals from "../../../hooks/useModals";

// importuri lazy
import BurgerMenu from "../../BurgerMenu/BurgerMenu.styled";
import LogoutModal from "../../LogoutModal/LogoutModal.styled";
import EditUserModal from "../../EditUserModal/EditUserModal.styled";

const Modals = () => {
  const { isBurgerMenuOpen, isLogoutModalOpen, isEditUserModalOpen } =
    useModals();

  return (
    <>
      {isBurgerMenuOpen && createPortal(<BurgerMenu />, document.body)}
      {isLogoutModalOpen && createPortal(<LogoutModal />, document.body)}
      {isEditUserModalOpen && createPortal(<EditUserModal />, document.body)}
    </>
  );
};

export default Modals;
