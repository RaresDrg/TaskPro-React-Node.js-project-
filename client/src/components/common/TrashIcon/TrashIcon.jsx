import PropTypes from "prop-types";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";

const TrashIcon = ({ className: styles, handlerFunction, secondAction }) => {
  return (
    <UseAnimations
      animation={trash2}
      size={21}
      strokeColor="currentColor"
      onClick={handlerFunction}
      className={styles}
      data-secondary-action={`${secondAction ?? "none"}`}
    />
  );
};

TrashIcon.propTypes = {
  handlerFunction: PropTypes.func.isRequired,
  secondAction: PropTypes.string,
};

export default TrashIcon;
