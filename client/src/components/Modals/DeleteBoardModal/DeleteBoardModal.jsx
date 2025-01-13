import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../../redux/boards/operations";
import { notify } from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const DeleteBoardModal = ({ className: styles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useAuth();
  const { board } = useBoards();

  function handleDelete() {
    dispatch(deleteBoard(board["_id"]))
      .unwrap()
      .then((value) => {
        notify.success(value.message);
        closeModal();
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => notify.error(error));
  }

  return (
    <Modal className={styles}>
      <p>Are you sure you want to delete the board?</p>
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

export default DeleteBoardModal;
