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

  const { boardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBoard(boardId))
      .unwrap()
      .then(() => setShouldWait(false))
      .catch(() => navigate("/*"));
  }, [boardId]);

  const { board } = useBoards();

  if (shouldWait) return <LoadingSpinner />;

  const showFilterBtn = board.columns.some((column) => column.cards.length > 0);

  return (
    <section className={`${styles} animate__animated animate__fadeIn`}>
      <Container>
        <BoardTitle text={board.title} />
        {showFilterBtn && <FilterBtn />}
        <BoardColumns />
      </Container>
    </section>
  );
};

export default BoardPage;
