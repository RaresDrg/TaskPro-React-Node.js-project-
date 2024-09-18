const selectIsLoading = (state) => state.auth.isLoading;
const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectUser = (state) => state.auth.user;
const selectTheme = (state) => state.auth.user.theme;

// todo: => poate merge doar cu selectAuth si gestionat chestione in hook: use auth
export default {
  selectIsLoading,
  selectUser,
  selectIsLoggedIn,
  selectTheme,
};
