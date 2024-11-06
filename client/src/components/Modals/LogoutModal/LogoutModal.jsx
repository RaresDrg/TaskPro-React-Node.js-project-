import { useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/hooks";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const LogoutModal = ({ className: styles }) => {
  const modalRef = useRef();
  const { theme } = useAuth();
  const dispatch = useDispatch();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("LogoutModal")), 500);
  }

  function handleExit() {
    closeModal();
    dispatch(logout())
      .unwrap()
      .finally(() => toast.success("Logged out successfully"));
  }

  return (
    <Modal className={styles} closeModal={closeModal} modalRef={modalRef}>
      <p>Are you sure you want to exit ?</p>
      <div className="buttons-wrapper">
        <FormButton
          type={"button"}
          text={"Exit"}
          variant={`redBtn`}
          handlerFunction={() => handleExit()}
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

export default LogoutModal;
