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
    openBurgerMenu: (state, action) => {
      state.isBurgerMenuOpen = action.payload;
    },
    openLogoutModal: (state, action) => {
      state.isLogoutModalOpen = action.payload;
    },
    openEditUserModal: (state, action) => {
      state.isEditUserModalOpen = action.payload;
    },
  },
});

export const { openBurgerMenu, openLogoutModal, openEditUserModal } =
  modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
