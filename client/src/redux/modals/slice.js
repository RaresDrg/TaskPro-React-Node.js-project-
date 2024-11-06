import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditUserModalOpen: false,
  isBurgerMenuOpen: false,
  isNeedHelpModalOpen: false,
  isLogoutModalOpen: false,
  isFiltersModalOpen: false,
  isCreateBoardModalOpen: false,
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
    setModalClose: (state, action) => {
      state[`is${action.payload}Open`] = false;
    },
  },
});

export const { setModalOpen, setModalClose } = modalsSlice.actions;
export const modalsReducer = modalsSlice.reducer;
