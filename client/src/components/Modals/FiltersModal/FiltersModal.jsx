import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/boards/slice";
import { setModalClose } from "../../../redux/modals/slice";
import { getPriorityOptions } from "../../../utils/utils";
import { useBoards } from "../../../hooks/hooks";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";

const FiltersModal = ({ className: styles }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { filter } = useBoards();
  const priorityOptions = getPriorityOptions();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("FiltersModal")), 500);
  }

  return (
    <Modal className={styles} closeModal={closeModal} modalRef={modalRef}>
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
