import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isForgotPasswordModalOpen: false,
  isEditUserModalOpen: false,
  isBurgerMenuOpen: false,
  isNeedHelpModalOpen: false,
  isLogoutModalOpen: false,
  isFiltersModalOpen: false,
  isAddBoardModalOpen: false,
  isEditBoardModalOpen: false,
  isDeleteBoardModalOpen: false,
  isAddColumnModalOpen: false,
  isEditColumnModalOpen: false,
  isDeleteColumnModalOpen: false,
  isAddCardModalOpen: false,
  isEditCardModalOpen: false,
  isDeleteCardModalOpen: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state[`is${action.payload}Open`] = true;
    },
    setModalsClose: () => initialState,
    setBurgerMenuClose: (state) => {
      state.isBurgerMenuOpen = false;
    },
  },
});

export const { setModalOpen, setModalsClose, setBurgerMenuClose } =
  modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
