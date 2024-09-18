import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBurgerMenuOpen: false,
  isLogoutModalOpen: false,
  isEditUserModalOpen: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleBurgerMenu: (state) => {
      state.isBurgerMenuOpen = !state.isBurgerMenuOpen;
    },
    toggleLogoutModal: (state) => {
      state.isLogoutModalOpen = !state.isLogoutModalOpen;
    },
    toggleEditUserModal: (state) => {
      state.isEditUserModalOpen = !state.isEditUserModalOpen;
    },
  },
});

export const { toggleBurgerMenu, toggleLogoutModal, toggleEditUserModal } =
  modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
