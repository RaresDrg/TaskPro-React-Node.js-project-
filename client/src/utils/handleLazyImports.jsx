import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner.styled";

function lazyImport(path) {
  const LazyComponent = lazy(() => import(path));

  return (props) => (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Pages
const HomePage = lazyImport("../pages/HomePage/HomePage.styled");
const RegisterPage = lazyImport("../pages/RegisterPage/RegisterPage.styled");
const LoginPage = lazyImport("../pages/LoginPage/LoginPage.styled");
const ResetPasswordPage = lazyImport(
  "../pages/ResetPasswordPage/ResetPasswordPage.styled"
);
const DashboardPage = lazyImport("../pages/DashboardPage/DashboardPage.styled");
const BoardPage = lazyImport("../pages/BoardPage/BoardPage.styled");
const NotFoundPage = lazyImport("../pages/NotFoundPage/NotFoundPage.styled");

export {
  HomePage,
  RegisterPage,
  LoginPage,
  ResetPasswordPage,
  DashboardPage,
  BoardPage,
  NotFoundPage,
};

// Modals
const BurgerMenu = lazyImport("../components/BurgerMenu/BurgerMenu.styled");
const NeedHelpModal = lazyImport(
  "../components/Modals/NeedHelpModal/NeedHelpModal.styled"
);
const LogoutModal = lazyImport(
  "../components/Modals/LogoutModal/LogoutModal.styled"
);
const EditUserModal = lazyImport(
  "../components/Modals/EditUserModal/EditUserModal.styled"
);
const FiltersModal = lazyImport(
  "../components/Modals/FiltersModal/FiltersModal.styled"
);
const AddBoardModal = lazyImport(
  "../components/Modals/AddBoardModal/AddBoardModal"
);
const DeleteBoardModal = lazyImport(
  "../components/Modals/DeleteBoardModal/DeleteBoardModal.styled"
);
const EditBoardModal = lazyImport(
  "../components/Modals/EditBoardModal/EditBoardModal"
);
const AddColumnModal = lazyImport(
  "../components/Modals/AddColumnModal/AddColumnModal"
);
const DeleteColumnModal = lazyImport(
  "../components/Modals/DeleteColumnModal/DeleteColumnModal.styled"
);
const EditColumnModal = lazyImport(
  "../components/Modals/EditColumnModal/EditColumnModal"
);
const AddCardModal = lazyImport(
  "../components/Modals/AddCardModal/AddCardModal.styled"
);
const DeleteCardModal = lazyImport(
  "../components/Modals/DeleteCardModal/DeleteCardModal.styled"
);
const EditCardModal = lazyImport(
  "../components/Modals/EditCardModal/EditCardModal.styled"
);

export {
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
};
