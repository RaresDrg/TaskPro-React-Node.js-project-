import { useEffect } from "react";
import { useBoards } from "../../../hooks/hooks";
import { store } from "../../../redux/store.js";
import { setModalsClose } from "../../../redux/modals/slice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.styled";
import icons from "../../../assets/icons/icons.svg";

export function closeModal() {
  document.querySelector(".modal").classList.add("hidden");
  setTimeout(() => store.dispatch(setModalsClose()), 500);
}

const Modal = ({ children, className: styles }) => {
  const { isLoading } = useBoards();

  useEffect(() => {
    document.addEventListener("keydown", handleClose);
    return () => document.removeEventListener("keydown", handleClose);
  }, []);

  function handleClose(e) {
    const allowClossing =
      e.key === "Escape" ||
      e.target === e.currentTarget ||
      e.target.classList.contains("close-btn");

    allowClossing && closeModal();
  }

  return (
    <>
      <div className={`${styles} modal`} onMouseDown={handleClose}>
        <div className="modal-content">
          <svg className="close-btn">
            <use href={`${icons}#icon-closeBtn`}></use>
          </svg>

          {children}
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default Modal;
