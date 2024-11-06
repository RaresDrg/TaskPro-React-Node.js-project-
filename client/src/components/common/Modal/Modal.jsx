import PropTypes from "prop-types";
import { useEffect } from "react";
import { useBoards } from "../../../hooks/hooks";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.styled";
import icons from "../../../assets/icons/icons.svg";

const Modal = ({ children, className: styles, closeModal, modalRef }) => {
  const { isLoading } = useBoards();

  useEffect(() => {
    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, []);

  function handleClose(e) {
    const allowClossing =
      e.key === "Escape" ||
      e.target === e.currentTarget ||
      e.target.classList.contains("close-btn");

    if (allowClossing) {
      closeModal();
    }
  }

  return (
    <>
      <div className={styles} ref={modalRef} onMouseDown={handleClose}>
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

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
