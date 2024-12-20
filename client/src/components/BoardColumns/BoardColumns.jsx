import { useEffect, useState } from "react";
import { updateBoardColumns } from "../../redux/boards/operations";
import { notifyWarning } from "../../utils/utils";
import { useBoards } from "../../hooks/hooks";
import { DragDropContext } from "@hello-pangea/dnd";
import BoardColumn from "../../components/BoardColumn/BoardColumn.styled";
import AddColumnBtn from "../../components/AddColumnBtn/AddColumnBtn.styled";

const BoardColumns = ({ className: styles }) => {
  const { board } = useBoards();
  const [columns, setColumns] = useState(board.columns);

  useEffect(() => {
    setColumns(board.columns);
  }, [board.columns]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles}>
        {columns.map((column) => (
          <BoardColumn key={column["_id"]} column={column} />
        ))}

        <AddColumnBtn />
      </div>
    </DragDropContext>
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

    const movedCard = columns
      .flatMap((column) => column.cards)
      .find((card) => card["_id"] === draggableId);

    const destinationColumn = columns.find(
      (column) => column["_id"] === destination.droppableId
    );

    const alreadyExistingCard = destinationColumn.cards.find((card) => {
      return card.title === movedCard.title && card["_id"] !== movedCard["_id"];
    });

    if (alreadyExistingCard) {
      notifyWarning("A card with the same title already exists in the column.");
      return;
    }

    const updatedColumns = columns.map((column) => {
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

    setColumns(updatedColumns);
    updateBoardColumns(board["_id"], updatedColumns);
  }
};

export default BoardColumns;
