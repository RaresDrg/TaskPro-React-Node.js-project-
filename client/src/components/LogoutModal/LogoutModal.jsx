import { useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { toggleLogoutModal } from "../../redux/modals/slice";
import { toast } from "react-toastify";
import CloseBtn from "../common/CloseBtn/CloseBtn.styled";
import FormButton from "../common/FormButton/FormButton.styled";

const LogoutModal = ({ className: styles }) => {
  const modalRef = useRef();
  const { theme } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => modalRef.current.classList.add("visible"), 0);
    document.addEventListener("keydown", handleClose);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleClose);
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleClose(e) {
    if (e.key === "Escape" || e.currentTarget === e.target) {
      closeModal();
    }
  }

  function closeModal() {
    modalRef.current.classList.remove("visible");
    setTimeout(() => dispatch(toggleLogoutModal()), 500);
  }

  function handleExit() {
    closeModal();

    dispatch(logout())
      .unwrap()
      .then((value) => toast.success(value.message))
      .catch((error) => {
        const errorNotification =
          error?.response?.data?.message || "Internal server error";
        toast.error(errorNotification);
        dispatch(toggleLogoutModal());
      });
  }

  return (
    <div className={styles} ref={modalRef} onClick={handleClose}>
      <div className={`modal-content ${theme}`}>
        <CloseBtn handlerFunction={() => closeModal()} />

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
      </div>
    </div>
  );
};

export default LogoutModal;
