import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import useAuth from "./hooks/useAuth";

import Notification from "./components/common/Notification/Notification";
import LoadingScreen from "./components/common/LoadingScreen/LoadingScreen.styled";

import HomePage from "./pages/HomePage/HomePage.styled";
import RegisterPage from "./pages/RegisterPage/RegisterPage.styled";
import LoginPage from "./pages/LoginPage/LoginPage.styled";
import SharedLayout from "./components/common/SharedLayout/SharedLayout";
import DashboardPage from "./pages/DashboardPage/DashboardPage.styled";
import ProjectPage from "./pages/ProjectPage/ProjectPage.styled";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.styled";

import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import RestrictedRoutes from "./pages/RestrictedRoutes/RestrictedRoutes";

// todo: => problema cu restrcitionarea, se vede la project page
// todo: => verificat si restrictionat paginile care nu exista  */
// todo: => de rectificat putin, la cum trimit functiile, gen in logout btn cum trimit functie de close catre close BTN
// todo: => verificat pe lordicon, daca pot sa adaug nitte iconiste mai misto
// todo: => lasy imports, si suspense
// propTypes: => acolo unde primesc props: ex: form button

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<RestrictedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<SharedLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path=":projectId" element={<ProjectPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {isLoading && createPortal(<LoadingScreen />, document.body)}

      <Notification />
    </>
  );
};

export default App;
