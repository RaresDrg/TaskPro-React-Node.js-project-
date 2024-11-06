import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";

const FiltersBtn = ({ className: styles }) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={styles}
      onClick={() => dispatch(setModalOpen("FiltersModal"))}
    >
      <svg width="16" height="16">
        <use href={`${icons}#icon-filter`}></use>
      </svg>
      <span>Filters</span>
    </button>
  );
};

export default FiltersBtn;
