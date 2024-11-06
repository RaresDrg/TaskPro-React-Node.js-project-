const selectIsLoading = (state) => state.auth.isLoading;
const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectUser = (state) => state.auth.user;
const selectTheme = (state) => state.auth.user.theme;

export default { selectIsLoading, selectIsLoggedIn, selectUser, selectTheme };
