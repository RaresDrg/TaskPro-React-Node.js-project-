import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner.styled";

function wrap(LazyComponent) {
  const WrappedComponent = (props) => (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  WrappedComponent.displayName =
    LazyComponent.displayName || LazyComponent.name || "Component";

  return WrappedComponent;
}

// Pages
const HomePage = wrap(lazy(() => import("../pages/HomePage/HomePage.styled")));
const LoginPage = wrap(
  lazy(() => import("../pages/LoginPage/LoginPage.styled"))
);
const RegisterPage = wrap(
  lazy(() => import("../pages/RegisterPage/RegisterPage.styled"))
);
const ResetPasswordPage = wrap(
  lazy(() => import("../pages/ResetPasswordPage/ResetPasswordPage.styled"))
);
const DashboardPage = wrap(
  lazy(() => import("../pages/DashboardPage/DashboardPage.styled"))
);
const BoardPage = wrap(
  lazy(() => import("../pages/BoardPage/BoardPage.styled"))
);
const NotFoundPage = wrap(
  lazy(() => import("../pages/NotFoundPage/NotFoundPage.styled"))
);

export {
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  DashboardPage,
  BoardPage,
  NotFoundPage,
};

// Modals
const BurgerMenu = wrap(
  lazy(() => import("../components/BurgerMenu/BurgerMenu.styled"))
);
const NeedHelpModal = wrap(
  lazy(() => import("../components/Modals/NeedHelpModal/NeedHelpModal.styled"))
);
const LogoutModal = wrap(
  lazy(() => import("../components/Modals/LogoutModal/LogoutModal.styled"))
);
const EditUserModal = wrap(
  lazy(() => import("../components/Modals/EditUserModal/EditUserModal.styled"))
);
const FiltersModal = wrap(
  lazy(() => import("../components/Modals/FiltersModal/FiltersModal.styled"))
);
const AddBoardModal = wrap(
  lazy(() => import("../components/Modals/AddBoardModal/AddBoardModal"))
);
const DeleteBoardModal = wrap(
  lazy(() =>
    import("../components/Modals/DeleteBoardModal/DeleteBoardModal.styled")
  )
);
const EditBoardModal = wrap(
  lazy(() => import("../components/Modals/EditBoardModal/EditBoardModal"))
);
const AddColumnModal = wrap(
  lazy(() => import("../components/Modals/AddColumnModal/AddColumnModal"))
);
const DeleteColumnModal = wrap(
  lazy(() =>
    import("../components/Modals/DeleteColumnModal/DeleteColumnModal.styled")
  )
);
const EditColumnModal = wrap(
  lazy(() => import("../components/Modals/EditColumnModal/EditColumnModal"))
);
const AddCardModal = wrap(
  lazy(() => import("../components/Modals/AddCardModal/AddCardModal.styled"))
);
const DeleteCardModal = wrap(
  lazy(() =>
    import("../components/Modals/DeleteCardModal/DeleteCardModal.styled")
  )
);
const EditCardModal = wrap(
  lazy(() => import("../components/Modals/EditCardModal/EditCardModal.styled"))
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
