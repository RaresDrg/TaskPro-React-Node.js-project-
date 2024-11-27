import { lazy } from "react";
import { useModals } from "../../hooks/hooks";
import CreateBoardModal from "./CreateBoardModal/CreateBoardModal";
import EditBoardModal from "./EditBoardModal/EditBoardModal";
import DeleteBoardModal from "./DeleteBoardModal/DeleteBoardModal.styled";
import LogoutModal from "./LogoutModal/LogoutModal.styled";
import NeedHelpModal from "./NeedHelpModal/NeedHelpModal.styled";

const BurgerMenu = lazy(() => import("../BurgerMenu/BurgerMenu.styled"));
const FiltersModal = lazy(() => import("./FiltersModal/FiltersModal.styled"));
const AddColumnModal = lazy(() => import("./AddColumnModal/AddColumnModal"));
const EditColumnModal = lazy(() => import("./EditColumnModal/EditColumnModal"));
const AddCardModal = lazy(() => import("./AddCardModal/AddCardModal.styled"));
const EditUserModal = lazy(() =>
  import("./EditUserModal/EditUserModal.styled")
);
const DeleteColumnModal = lazy(() =>
  import("./DeleteColumnModal/DeleteColumnModal.styled")
);
const EditCardModal = lazy(() =>
  import("./EditCardModal/EditCardModal.styled")
);
const DeleteCardModal = lazy(() =>
  import("./DeleteCardModal/DeleteCardModal.styled")
);

const Modals = () => {
  const modals = useModals();

  return (
    <>
      {modals.isBurgerMenuOpen && <BurgerMenu />}
      {modals.isEditUserModalOpen && <EditUserModal />}
      {modals.isNeedHelpModalOpen && <NeedHelpModal />}
      {modals.isLogoutModalOpen && <LogoutModal />}
      {modals.isFiltersModalOpen && <FiltersModal />}
      {modals.isCreateBoardModalOpen && <CreateBoardModal />}
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
