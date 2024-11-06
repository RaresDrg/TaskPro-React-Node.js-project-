import PropTypes from "prop-types";

const FormButton = (props) => {
  function handleClick(e) {
    e.stopPropagation();
    props.handlerFunction && props.handlerFunction();
  }

  return (
    <button
      type={props.type}
      className={props.className}
      onClick={handleClick}
      disabled={props.isDisabled}
      data-variant={props.variant}
    >
      {props.text}
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
