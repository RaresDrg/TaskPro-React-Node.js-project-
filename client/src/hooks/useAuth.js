import { useSelector } from "react-redux";
import authSelectors from "../redux/auth/selectors";

const useAuth = () => {
  const isLoading = useSelector(authSelectors.selectIsLoading);
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
  const user = useSelector(authSelectors.selectUser);
  const theme = useSelector(authSelectors.selectTheme);

  return {
    isLoading,
    isLoggedIn,
    user,
    theme,
  };
};

export default useAuth;
