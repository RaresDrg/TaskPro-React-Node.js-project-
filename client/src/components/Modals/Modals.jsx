import { lazy, Suspense } from "react";
import { useModals } from "../../hooks/hooks";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner.styled";

const BurgerMenu = lazy(() => import("../BurgerMenu/BurgerMenu.styled"));
const LogoutModal = lazy(() => import("./LogoutModal/LogoutModal.styled"));
const FiltersModal = lazy(() => import("./FiltersModal/FiltersModal.styled"));
const EditBoardModal = lazy(() => import("./EditBoardModal/EditBoardModal"));
const AddColumnModal = lazy(() => import("./AddColumnModal/AddColumnModal"));
const EditColumnModal = lazy(() => import("./EditColumnModal/EditColumnModal"));
const AddCardModal = lazy(() => import("./AddCardModal/AddCardModal.styled"));
const EditUserModal = lazy(() =>
  import("./EditUserModal/EditUserModal.styled")
);
const NeedHelpModal = lazy(() =>
  import("./NeedHelpModal/NeedHelpModal.styled")
);
const CreateBoardModal = lazy(() =>
  import("./CreateBoardModal/CreateBoardModal")
);
const DeleteBoardModal = lazy(() =>
  import("./DeleteBoardModal/DeleteBoardModal.styled")
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
    <Suspense>
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
    </Suspense>
  );
};

export default Modals;
