const selectIsLoading = (state) => state.boards.isLoading;
const selectBoardsList = (state) => state.boards.boardsList;
const selectBoard = (state) => state.boards.board;
const selectColumn = (state) => state.boards.column;
const selectCard = (state) => state.boards.card;
const selectFilter = (state) => state.boards.filter;

export default {
  selectIsLoading,
  selectBoardsList,
  selectBoard,
  selectColumn,
  selectCard,
  selectFilter,
};
