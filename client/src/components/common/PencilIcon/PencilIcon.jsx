import PropTypes from "prop-types";
import icons from "../../../assets/icons/icons.svg";

const PencilIcon = ({ className: styles, handlerFunction, secondAction }) => {
  return (
    <svg
      className={styles}
      onClick={handlerFunction}
      data-secondary-action={`${secondAction ?? "none"}`}
    >
      <use href={`${icons}#icon-pencil`}></use>
    </svg>
  );
};

PencilIcon.propTypes = {
  handlerFunction: PropTypes.func.isRequired,
  secondAction: PropTypes.string,
};

export default PencilIcon;
