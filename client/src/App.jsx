import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth, useBoards } from "./hooks/hooks";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import RestrictedRoutes from "./pages/RestrictedRoutes/RestrictedRoutes";
import SharedLayout from "./components/common/SharedLayout/SharedLayout";
import LoadingScreen from "./components/common/LoadingScreen/LoadingScreen.styled";
import Notification from "./components/common/Notification/Notification";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  DashboardPage,
  BoardPage,
  NotFoundPage,
} from "./utils/handleLazyImports";

const App = () => {
  const { isLoading, theme } = useAuth();
  const { board } = useBoards();

  return (
    <ThemeProvider theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<SharedLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path=":boardId" element={<BoardPage board={board} />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

      {isLoading && <LoadingScreen />}
      <Notification />
    </ThemeProvider>
  );
};

export default App;
