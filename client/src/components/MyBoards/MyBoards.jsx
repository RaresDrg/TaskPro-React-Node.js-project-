import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";
import { useBoards } from "../../hooks/hooks";
import BoardItem from "../BoardItem/BoardItem.styled";

const MyBoards = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { boardsList } = useBoards();

  return (
    <div className={styles}>
      <span>My Boards</span>
      <div>
        <span>Create a new board</span>
        <svg
          className="create-btn"
          onClick={() => dispatch(setModalOpen("AddBoardModal"))}
          data-secondary-action="close burger menu"
        >
          <use href={`${icons}#icon-plus`}></use>
        </svg>
      </div>

      {boardsList && (
        <ul className="boards-list">
          {boardsList.map((item) => (
            <BoardItem key={item["_id"]} board={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBoards;
