import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/boards/slice";
import { getPriorityOptions } from "../../../utils/utils";
import { useBoards } from "../../../hooks/hooks";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";

const FiltersModal = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { filter } = useBoards();
  const priorityOptions = getPriorityOptions();

  return (
    <Modal className={styles}>
      <FormTitle title="Filters" />
      <div>
        <h3>Label color: - priority</h3>
        <button
          type="button"
          onMouseDown={() =>
            filter === null
              ? closeModal()
              : dispatch(setFilter(null)) && closeModal()
          }
        >
          Show all
        </button>
        <div>
          {priorityOptions.map((item) => (
            <button
              type="button"
              key={item}
              className={`${item === filter && "active"}`}
              onMouseDown={(e) =>
                e.target.textContent === filter
                  ? closeModal()
                  : dispatch(setFilter(item)) && closeModal()
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default FiltersModal;
