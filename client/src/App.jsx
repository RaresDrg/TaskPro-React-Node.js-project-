import { useEffect, useState, lazy } from "react";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { getBoardsList } from "./redux/boards/operations";
import { useAuth, useBoards } from "./hooks/hooks";

import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import RestrictedRoutes from "./pages/RestrictedRoutes/RestrictedRoutes";
import SharedLayout from "./components/common/SharedLayout/SharedLayout";
import LoadingScreen from "./components/common/LoadingScreen/LoadingScreen.styled";
import LoadingSpinner from "./components/common/LoadingSpinner/LoadingSpinner.styled";
import Notification from "./components/common/Notification/Notification";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.styled"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.styled"));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage.styled")
);
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage/DashboardPage.styled")
);
const BoardPage = lazy(() => import("./pages/BoardPage/BoardPage.styled"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.styled")
);

const App = () => {
  const [shouldWait, setShouldWait] = useState(true);
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn, theme } = useAuth();
  const { board } = useBoards();

  useEffect(() => {
    dispatch(refreshUser())
      .unwrap()
      .catch(() => setShouldWait(false));
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getBoardsList())
        .unwrap()
        .finally(() => setShouldWait(false));
    }
  }, [isLoggedIn]);

  if (shouldWait) return <LoadingSpinner />;

  return (
    <ThemeProvider theme={{ theme }}>
      <Routes>
        <Route element={<RestrictedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<SharedLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path=":boardId" element={<BoardPage board={board} />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {isLoading && <LoadingScreen />}
      <Notification />
    </ThemeProvider>
  );
};

export default App;
