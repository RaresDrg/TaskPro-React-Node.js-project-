import PropTypes from "prop-types";

const FormButton = ({
  className: styles,
  type,
  text,
  handlerFunction,
  isDisabled,
  variant,
}) => {
  return (
    <button
      type={type}
      className={styles}
      onClick={handlerFunction}
      disabled={isDisabled}
      data-variant={variant}
    >
      {text}
    </button>
  );
};

FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handlerFunction: PropTypes.func,
  isDisabled: PropTypes.bool,
  variant: PropTypes.string.isRequired,
};

export default FormButton;
