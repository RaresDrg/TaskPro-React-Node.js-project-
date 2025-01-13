import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

const FormTextField = (props) => {
  return (
    <div className={`${props.className} ${props.errors ? "onError" : ""}`}>
      <Field
        type="text"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        autoFocus={props.isFocused}
        disabled={props.isDisabled}
      />
      <ErrorMessage className="error" name={props.name} component="span" />
    </div>
  );
};

FormTextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.bool,
  isFocused: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default FormTextField;
