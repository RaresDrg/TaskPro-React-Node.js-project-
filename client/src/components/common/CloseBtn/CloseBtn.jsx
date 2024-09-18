import useAuth from "../../../hooks/useAuth";
import icons from "../../../assets/icons/icons.svg";
import PropTypes from "prop-types";

const CloseBtn = ({ className: styles, handlerFunction }) => {
  const { theme } = useAuth();

  return (
    <button
      type="button"
      className={`${styles} ${theme}`}
      onClick={() => handlerFunction()}
    >
      <svg>
        <use href={`${icons}#icon-closeBtn`}></use>
      </svg>
    </button>
  );
};

CloseBtn.propTypes = {
  handlerFunction: PropTypes.func.isRequired,
};

export default CloseBtn;
