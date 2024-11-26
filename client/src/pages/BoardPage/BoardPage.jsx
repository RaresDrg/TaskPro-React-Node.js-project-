import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoard } from "../../redux/boards/operations";
import { updateBoardColumns } from "../../redux/boards/operations";
import { useBoards } from "../../hooks/hooks";
import { toast } from "react-toastify";
import { DragDropContext } from "@hello-pangea/dnd";
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

  const { board } = useBoards();

  if (shouldWait) return <LoadingSpinner />;

  const showFilterBtn = board.columns.some((column) => column.cards.length > 0);

  return (
    <section className={styles}>
      <Container>
        <h1 title={board.title}>{board.title}</h1>
        {showFilterBtn && <FiltersBtn />}

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="columns">
            {board.columns.map((column) => (
              <BoardColumn key={column["_id"]} column={column} />
            ))}

            <AddColumnBtn />
          </div>
        </DragDropContext>
      </Container>
    </section>
  );

  function handleDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const movedCard = board.columns
      .flatMap((column) => column.cards)
      .find((card) => card["_id"] === draggableId);

    const destinationColumn = board.columns.find(
      (column) => column["_id"] === destination.droppableId
    );

    const alreadyExistingCard = destinationColumn.cards.some((card) => {
      return card.title === movedCard.title && card["_id"] !== movedCard["_id"];
    });

    if (alreadyExistingCard) {
      toast.error("A card with the same title already exists in the column.");
      return;
    }

    const updatedColumns = board.columns.map((column) => {
      if (
        column["_id"] === source.droppableId &&
        column["_id"] === destination.droppableId
      ) {
        const updatedCards = [...column.cards];
        updatedCards.splice(source.index, 1);
        updatedCards.splice(destination.index, 0, movedCard);

        return {
          ...column,
          cards: updatedCards,
        };
      }

      if (column["_id"] === source.droppableId) {
        return {
          ...column,
          cards: column.cards.filter((card) => card["_id"] !== draggableId),
        };
      }

      if (column["_id"] === destination.droppableId) {
        const updatedCards = [...column.cards];
        updatedCards.splice(destination.index, 0, movedCard);

        return {
          ...column,
          cards: updatedCards,
        };
      }

      return column;
    });

    dispatch(updateBoardColumns({ boardId, updatedColumns }))
      .unwrap()
      .catch(() => toast.error("Internal server error. Try again later."));
  }
};

export default BoardPage;
