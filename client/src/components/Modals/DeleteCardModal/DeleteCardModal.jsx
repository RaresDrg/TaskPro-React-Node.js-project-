import { useDispatch } from "react-redux";
import { deleteBoardColumnCard } from "../../../redux/boards/operations";
import { notify } from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const DeleteCardModal = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, card } = useBoards();

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
        notify.success(value.message);
        closeModal();
      })
      .catch((error) => notify.error(error));
  }

  return (
    <Modal className={styles}>
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
