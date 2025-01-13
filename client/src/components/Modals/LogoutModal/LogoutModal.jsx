import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/operations";
import { notify } from "../../../utils/utils";
import { useAuth } from "../../../hooks/hooks";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const LogoutModal = ({ className: styles }) => {
  const { theme } = useAuth();
  const dispatch = useDispatch();

  function handleExit() {
    closeModal();
    dispatch(logout())
      .unwrap()
      .finally(() => notify.success("Logged out successfully"));
  }

  return (
    <Modal className={styles}>
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
