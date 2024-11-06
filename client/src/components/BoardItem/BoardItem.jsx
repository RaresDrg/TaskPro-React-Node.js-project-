import PropTypes from "prop-types";
import { NavLink, useParams } from "react-router-dom";
import icons from "../../assets/icons/icons.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";

const BoardItem = ({ className: styles, board }) => {
  const dispatch = useDispatch();

  const { boardId } = useParams();
  const isActive = boardId === board["_id"];

  return (
    <li className={styles}>
      <NavLink to={`${board["_id"]}`} data-secondary-action="close burger menu">
        <svg>
          <use href={`${icons}#${board.icon}`}></use>
        </svg>
        <span title={board.title}>{board.title}</span>
      </NavLink>

      {isActive && (
        <div className="action-icons">
          <svg
            onClick={() => dispatch(setModalOpen("EditBoardModal"))}
            data-secondary-action="close burger menu"
          >
            <use href={`${icons}#icon-pencil`}></use>
          </svg>
          <UseAnimations
            animation={trash2}
            size={21}
            strokeColor="currentColor"
            onClick={() => dispatch(setModalOpen("DeleteBoardModal"))}
            data-secondary-action="close burger menu"
          />
        </div>
      )}
    </li>
  );
};

BoardItem.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardItem;
