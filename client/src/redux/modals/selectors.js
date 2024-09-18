const selectIsBurgerMenuOpen = (state) => state.modals.isBurgerMenuOpen;
const selectIsLogoutModalOpen = (state) => state.modals.isLogoutModalOpen;
const selectIsEditUserModalOpen = (state) => state.modals.isEditUserModalOpen;

export default {
  selectIsBurgerMenuOpen,
  selectIsLogoutModalOpen,
  selectIsEditUserModalOpen,
};
