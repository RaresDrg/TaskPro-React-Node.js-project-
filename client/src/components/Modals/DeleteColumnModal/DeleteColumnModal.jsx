import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteBoardColumn } from "../../../redux/boards/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { toast } from "react-toastify";
import { useAuth, useBoards } from "../../../hooks/hooks";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const DeleteColumnModal = ({ className: styles }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, column } = useBoards();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("DeleteColumnModal")), 500);
  }

  function handleDelete() {
    const boardId = board["_id"];
    const columnId = column["_id"];

    dispatch(deleteBoardColumn({ boardId, columnId }))
      .unwrap()
      .then((value) => {
        toast.success(value.message);
        closeModal();
      })
      .catch((error) => {
        const errorNotification =
          error?.response?.data?.message || "Internal server error";
        toast.error(errorNotification);
      });
  }

  return (
    <Modal className={styles} closeModal={closeModal} modalRef={modalRef}>
      <p>Are you sure you want to delete the column?</p>
      <div className="buttons-wrapper">
        <FormButton
          type={"button"}
          text={"Delete"}
          variant={`redBtn`}
          handlerFunction={() => handleDelete()}
        />
        <FormButton
          type={"button"}
          text={"Close"}
          variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
          handlerFunction={() => closeModal()}
        />
      </div>
    </Modal>
  );
};

export default DeleteColumnModal;
