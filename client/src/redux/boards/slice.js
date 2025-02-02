import { createSlice } from "@reduxjs/toolkit";
import {
  addBoard,
  getBoardsList,
  getBoard,
  deleteBoard,
  updateBoard,
  updateBoardColumns,
  addBoardColumn,
  updateBoardColumn,
  deleteBoardColumn,
  addBoardColumnCard,
  updateBoardColumnCard,
  deleteBoardColumnCard,
} from "./operations";

const initialState = {
  error: null,
  isLoading: false,
  boardsList: null,
  board: null,
  column: null,
  card: null,
  filter: null,
};

const utils = {
  handlePending: (state) => {
    state.isLoading = true;
  },
  handleRejected: (state, action) => {
    state.isLoading = false;
    state.error =
      action.payload?.response?.data?.message || "Internal server error";
  },
  handleFulfilled: (state) => {
    state.isLoading = false;
    state.error = null;
  },
  handleError: (state, action) => {
    state.error =
      action.payload?.response?.data?.message || "Internal server error";
  },
  handleColumns: (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.board.columns = action.payload.data.columns;
  },
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setTargetedColumn: (state, action) => {
      state.column = action.payload;
    },
    setTargetedCard: (state, action) => {
      state.card = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // *Add board
      .addCase(addBoard.pending, utils.handlePending)
      .addCase(addBoard.rejected, utils.handleRejected)
      .addCase(addBoard.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        state.boardsList = action.payload.data.boardsList;
        state.board = action.payload.data.board;
        state.filter = null;
      })
      // *Get list
      .addCase(getBoardsList.rejected, (state, action) => {
        utils.handleError(state, action);
        state.boardsList = null;
      })
      .addCase(getBoardsList.fulfilled, (state, action) => {
        state.error = null;
        state.boardsList = action.payload.data;
      })
      // *Get board
      .addCase(getBoard.rejected, (state, action) => {
        utils.handleError(state, action);
        state.board = null;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.error = null;
        state.board = action.payload.data;
        state.filter = null;
      })
      // *Delete board
      .addCase(deleteBoard.pending, utils.handlePending)
      .addCase(deleteBoard.rejected, utils.handleRejected)
      .addCase(deleteBoard.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        state.boardsList = action.payload.data;
      })
      // *Update board
      .addCase(updateBoard.pending, utils.handlePending)
      .addCase(updateBoard.rejected, utils.handleRejected)
      .addCase(updateBoard.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        state.board = action.payload.data.board;
        state.boardsList = action.payload.data.boardsList;
      })

      // *Update board columns
      .addCase(updateBoardColumns.rejected, utils.handleError)
      .addCase(updateBoardColumns.fulfilled, (state, action) => {
        state.error = null;
        state.board.columns = action.payload.data;
      })

      // *Add board column
      .addCase(addBoardColumn.pending, utils.handlePending)
      .addCase(addBoardColumn.rejected, utils.handleRejected)
      .addCase(addBoardColumn.fulfilled, utils.handleColumns)
      // *Delete board column
      .addCase(deleteBoardColumn.pending, utils.handlePending)
      .addCase(deleteBoardColumn.rejected, utils.handleRejected)
      .addCase(deleteBoardColumn.fulfilled, utils.handleColumns)
      // *Update board column
      .addCase(updateBoardColumn.pending, utils.handlePending)
      .addCase(updateBoardColumn.rejected, utils.handleRejected)
      .addCase(updateBoardColumn.fulfilled, utils.handleColumns)

      // *Add board column card
      .addCase(addBoardColumnCard.pending, utils.handlePending)
      .addCase(addBoardColumnCard.rejected, utils.handleRejected)
      .addCase(addBoardColumnCard.fulfilled, utils.handleColumns)
      // *Delete board column card
      .addCase(deleteBoardColumnCard.pending, utils.handlePending)
      .addCase(deleteBoardColumnCard.rejected, utils.handleRejected)
      .addCase(deleteBoardColumnCard.fulfilled, utils.handleColumns)
      // *Update board column card
      .addCase(updateBoardColumnCard.pending, utils.handlePending)
      .addCase(updateBoardColumnCard.rejected, utils.handleRejected)
      .addCase(updateBoardColumnCard.fulfilled, utils.handleColumns);
  },
});

export const { setTargetedColumn, setTargetedCard, setFilter } =
  boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
