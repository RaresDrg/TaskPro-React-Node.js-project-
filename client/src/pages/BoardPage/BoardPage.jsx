import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoard } from "../../redux/boards/operations";
import { useBoards } from "../../hooks/hooks";
import Container from "../../components/common/Container/Container.styled";
import { BoardTitle } from "../../components/common/EllipsisTooltip/EllipsisTooltip.styled";
import BoardColumns from "../../components/BoardColumns/BoardColumns.styled";
import FilterBtn from "../../components/FilterBtn/FilterBtn.styled";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner.styled";

// *intrebare => de ce mi se rerandeaza componenta cand deschid modala de edit sau delete (debugger)

const BoardPage = ({ className: styles }) => {
  const [shouldWait, setShouldWait] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { boardId } = useParams();
  const { board, boardsList } = useBoards();

  useEffect(() => {
    setShouldWait(true);

    if (board && board["_id"] === boardId) {
      setShouldWait(false);
    } else {
      const isInTheList = boardsList?.find((board) => board["_id"] === boardId);

      !isInTheList
        ? navigate("/*", { replace: true })
        : dispatch(getBoard(boardId))
            .unwrap()
            .then(() => setShouldWait(false))
            .catch(() => navigate("/*", { replace: true }));
    }
  }, [boardId]);

  if (shouldWait) return <LoadingSpinner />;

  const showFilterBtn = board?.columns.some(
    (column) => column.cards.length > 0
  );

  return (
    <section
      className={`${styles} animate__animated animate__fadeIn`}
      key={`${board["_id"]} ${board.background.value}`}
    >
      <Container>
        <BoardTitle
          text={board.title}
          className={`animate__animated animate__slideInDown`}
        />
        {showFilterBtn && (
          <FilterBtn
            className={`animate__animated animate__flipInX animate__slow`}
          />
        )}
        <BoardColumns
          className={`animate__animated animate__fadeIn animate__slower`}
        />
      </Container>
    </section>
  );
};

export default BoardPage;
