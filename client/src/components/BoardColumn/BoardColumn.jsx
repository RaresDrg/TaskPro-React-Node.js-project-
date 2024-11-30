import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setTargetedColumn } from "../../redux/boards/slice";
import { setModalOpen } from "../../redux/modals/slice";
import { useAuth, useBoards } from "../../hooks/hooks";
import { Droppable } from "@hello-pangea/dnd";
import { ColumnTitle } from "../common/EllipsisTooltip/EllipsisTooltip.styled";
import PencilIcon from "../common/PencilIcon/PencilIcon.styled";
import TrashIcon from "../common/TrashIcon/TrashIcon.styled";
import ColumnCard from "../ColumnCard/ColumnCard.styled";
import FormButton from "../common/FormButton/FormButton.styled";

const BoardColumn = ({ className: styles, column }) => {
  const { theme } = useAuth();
  const { filter } = useBoards();
  const dispatch = useDispatch();

  const cardsList = !filter
    ? column.cards
    : column.cards.filter((card) => card.priority === filter);

  return (
    <Droppable droppableId={column["_id"]}>
      {(provided) => (
        <div
          className={styles}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-heading">
            <ColumnTitle text={column.title} />
            <div className="action-icons">
              <PencilIcon
                handlerFunction={() => {
                  dispatch(setTargetedColumn(column));
                  dispatch(setModalOpen("EditColumnModal"));
                }}
              />
              <TrashIcon
                handlerFunction={() => {
                  dispatch(setTargetedColumn(column));
                  dispatch(setModalOpen("DeleteColumnModal"));
                }}
              />
            </div>
          </div>

          <div className="cards-list">
            {cardsList.map((card, index) => (
              <ColumnCard key={card["_id"]} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>

          <FormButton
            type="button"
            text="Add card"
            handlerFunction={() => {
              dispatch(setTargetedColumn(column));
              dispatch(setModalOpen("AddCardModal"));
            }}
            variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
          />
        </div>
      )}
    </Droppable>
  );
};

BoardColumn.propTypes = {
  column: PropTypes.object.isRequired,
};

export default BoardColumn;
