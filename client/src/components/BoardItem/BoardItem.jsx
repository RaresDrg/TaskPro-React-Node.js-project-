import PropTypes from "prop-types";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";
import icons from "../../assets/icons/icons.svg";
import { BoardItemTitle } from "../common/EllipsisTooltip/EllipsisTooltip.styled";
import PencilIcon from "../common/PencilIcon/PencilIcon.styled";
import TrashIcon from "../common/TrashIcon/TrashIcon.styled";

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
        <BoardItemTitle text={board.title} />
      </NavLink>

      {isActive && (
        <div className="action-icons">
          <PencilIcon
            handlerFunction={() => dispatch(setModalOpen("EditBoardModal"))}
            secondAction="close burger menu"
          />
          <TrashIcon
            handlerFunction={() => dispatch(setModalOpen("DeleteBoardModal"))}
            secondAction="close burger menu"
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
