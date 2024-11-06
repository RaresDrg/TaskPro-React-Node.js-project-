import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../../redux/boards/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { toast } from "react-toastify";
import { useAuth, useBoards } from "../../../hooks/hooks";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const DeleteBoardModal = ({ className: styles }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useAuth();
  const { board } = useBoards();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("DeleteBoardModal")), 500);
  }

  function handleDelete() {
    dispatch(deleteBoard(board["_id"]))
      .unwrap()
      .then((value) => {
        toast.success(value.message);
        closeModal();
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorNotification =
          error?.response?.data?.message || "Internal server error";
        toast.error(errorNotification);
      });
  }

  return (
    <Modal className={styles} closeModal={closeModal} modalRef={modalRef}>
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
