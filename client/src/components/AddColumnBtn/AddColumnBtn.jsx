import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";

const AddColumnBtn = ({ className: styles }) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={styles}
      onClick={() => dispatch(setModalOpen("AddColumnModal"))}
    >
      <svg>
        <use href={`${icons}#icon-plus`}></use>
      </svg>
      Add a column
    </button>
  );
};

export default AddColumnBtn;
