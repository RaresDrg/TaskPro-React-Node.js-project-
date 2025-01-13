import { useDispatch } from "react-redux";
import { deleteBoardColumn } from "../../../redux/boards/operations";
import { notify } from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const DeleteColumnModal = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, column } = useBoards();

  function handleDelete() {
    const boardId = board["_id"];
    const columnId = column["_id"];

    dispatch(deleteBoardColumn({ boardId, columnId }))
      .unwrap()
      .then((value) => {
        notify.success(value.message);
        closeModal();
      })
      .catch((error) => notify.error(error));
  }

  return (
    <Modal className={styles}>
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
