import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";
import { useBoards } from "../../hooks/hooks";

const FilterBtn = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { filter } = useBoards();

  return (
    <button
      type="button"
      className={`${styles} ${filter ? "active" : ""}`}
      onClick={() => dispatch(setModalOpen("FiltersModal"))}
    >
      <svg width="16" height="16">
        <use href={`${icons}#icon-filter`}></use>
      </svg>
      <span>{filter ?? "Filters"}</span>
    </button>
  );
};

export default FilterBtn;
