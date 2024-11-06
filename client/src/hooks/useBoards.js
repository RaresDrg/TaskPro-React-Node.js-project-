import { useSelector } from "react-redux";
import boardsSelectors from "../redux/boards/selectors";

const useBoards = () => {
  const isLoading = useSelector(boardsSelectors.selectIsLoading);
  const boardsList = useSelector(boardsSelectors.selectBoardsList);
  const board = useSelector(boardsSelectors.selectBoard);
  const column = useSelector(boardsSelectors.selectColumn);
  const card = useSelector(boardsSelectors.selectCard);
  const filter = useSelector(boardsSelectors.selectFilter);

  return {
    isLoading,
    boardsList,
    board,
    column,
    card,
    filter,
  };
};

export default useBoards;
