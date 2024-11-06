import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setTargetedColumn } from "../../redux/boards/slice";
import { setModalOpen } from "../../redux/modals/slice";
import { useAuth } from "../../hooks/hooks";
import icons from "../../assets/icons/icons.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import ColumnCard from "../ColumnCard/ColumnCard.styled";
import FormButton from "../common/FormButton/FormButton.styled";

const BoardColumn = ({ className: styles, column }) => {
  const { theme } = useAuth();
  const dispatch = useDispatch();

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

      {column.cards.length > 0 && (
        <div className="cards-list">
          {column.cards.map((item) => (
            <ColumnCard key={item["_id"]} card={item} />
          ))}
        </div>
      )}

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
