import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

const FormTextareaField = (props) => {
  return (
    <div className={`${props.className} ${props.errors ? "onError" : ""}`}>
      <Field
        as="textarea"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        rows={props.rows}
        autoFocus={props.isFocused}
      />
      <ErrorMessage className="error" name={props.name} component="span" />
    </div>
  );
};

FormTextareaField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.bool,
  rows: PropTypes.number.isRequired,
  isFocused: PropTypes.bool,
};

export default FormTextareaField;
