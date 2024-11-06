import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteBoardColumnCard } from "../../../redux/boards/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { toast } from "react-toastify";
import { useAuth, useBoards } from "../../../hooks/hooks";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const DeleteCardModal = ({ className: styles }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, card } = useBoards();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("DeleteCardModal")), 500);
  }

  function handleDelete() {
    const boardId = board["_id"];
    const cardId = card["_id"];
    const targetedColumn = board.columns.find((column) =>
      column.cards.find((card) => card["_id"] === cardId)
    );
    const columnId = targetedColumn["_id"];

    dispatch(deleteBoardColumnCard({ boardId, columnId, cardId }))
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
      <p>Are you sure you want to delete the card?</p>
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

export default DeleteCardModal;
