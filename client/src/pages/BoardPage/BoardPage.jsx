import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoard } from "../../redux/boards/operations";
import { useBoards } from "../../hooks/hooks";
import Container from "../../components/common/Container/Container.styled";
import BoardColumn from "../../components/BoardColumn/BoardColumn.styled";
import AddColumnBtn from "../../components/AddColumnBtn/AddColumnBtn.styled";
import FiltersBtn from "../../components/FiltersBtn/FiltersBtn.styled";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner.styled";

// *intrebare => de ce mi se rerandeaza componenta cand deschid modala de edit sau delete (debugger)
// todo: tranzitii

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

  const { board, filter } = useBoards();

  if (shouldWait) return <LoadingSpinner />;

  let boardColumns = board.columns;
  // const boardColumns = !filter
  //   ? board.columns
  //   : board.columns.map((column) => {
  //       return {
  //         ...column,
  //         cards: column.cards.filter((card) => card.priority === filter),
  //       };
  //     });

  const showFilterBtn = board.columns.some((column) => column.cards.length > 0);

  return (
    <section className={styles}>
      <Container>
        <h1 title={board.title}>{board.title}</h1>
        {showFilterBtn && <FiltersBtn />}

        <div className="columns">
          {boardColumns.map((item) => (
            <BoardColumn key={item["_id"]} column={item} />
          ))}

          <AddColumnBtn />
        </div>
      </Container>
    </section>
  );
};

export default BoardPage;
