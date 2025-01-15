import { useModals } from "../../hooks/hooks";
import {
  BurgerMenu,
  NeedHelpModal,
  LogoutModal,
  EditUserModal,
  FiltersModal,
  AddBoardModal,
  DeleteBoardModal,
  EditBoardModal,
  AddColumnModal,
  DeleteColumnModal,
  EditColumnModal,
  AddCardModal,
  DeleteCardModal,
  EditCardModal,
} from "../../utils/handleLazyImports";

const Modals = () => {
  const modals = useModals();

  return (
    <>
      {modals.isBurgerMenuOpen && <BurgerMenu />}
      {modals.isEditUserModalOpen && <EditUserModal />}
      {modals.isNeedHelpModalOpen && <NeedHelpModal />}
      {modals.isLogoutModalOpen && <LogoutModal />}
      {modals.isFiltersModalOpen && <FiltersModal />}
      {modals.isAddBoardModalOpen && <AddBoardModal />}
      {modals.isEditBoardModalOpen && <EditBoardModal />}
      {modals.isDeleteBoardModalOpen && <DeleteBoardModal />}
      {modals.isAddColumnModalOpen && <AddColumnModal />}
      {modals.isEditColumnModalOpen && <EditColumnModal />}
      {modals.isDeleteColumnModalOpen && <DeleteColumnModal />}
      {modals.isAddCardModalOpen && <AddCardModal />}
      {modals.isEditCardModalOpen && <EditCardModal />}
      {modals.isDeleteCardModalOpen && <DeleteCardModal />}
    </>
  );
};

export default Modals;
