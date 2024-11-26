import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setTargetedColumn } from "../../redux/boards/slice";
import { setModalOpen } from "../../redux/modals/slice";
import { useAuth, useBoards } from "../../hooks/hooks";
import icons from "../../assets/icons/icons.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import { Droppable } from "@hello-pangea/dnd";
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
    <div className={styles}>
      <div className="column-heading">
        <h3 title={column.title}>{column.title}</h3>
        <div className="action-icons">
          <svg
            onClick={() => {
              dispatch(setTargetedColumn(column));
              dispatch(setModalOpen("EditColumnModal"));
            }}
          >
            <use href={`${icons}#icon-pencil`}></use>
          </svg>
          <UseAnimations
            animation={trash2}
            size={21}
            strokeColor="currentColor"
            onClick={() => {
              dispatch(setTargetedColumn(column));
              dispatch(setModalOpen("DeleteColumnModal"));
            }}
          />
        </div>
      </div>

      <Droppable droppableId={column["_id"]}>
        {(provided) => (
          <div
            className="cards-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cardsList.map((card, index) => (
              <ColumnCard key={card["_id"]} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

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
  );
};

BoardColumn.propTypes = {
  column: PropTypes.object.isRequired,
};

export default BoardColumn;
