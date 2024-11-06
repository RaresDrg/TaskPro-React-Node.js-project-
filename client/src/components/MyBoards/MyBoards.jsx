import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";

const MyBoards = ({ className: styles }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles}>
      <span>My Boards</span>
      <div>
        <span>Create a new board</span>
        <svg
          className="create-btn"
          onClick={() => dispatch(setModalOpen("CreateBoardModal"))}
          data-secondary-action="close burger menu"
        >
          <use href={`${icons}#icon-plus`}></use>
        </svg>
      </div>
    </div>
  );
};

export default MyBoards;
