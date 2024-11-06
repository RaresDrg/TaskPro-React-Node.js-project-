import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

const FormTextareaField = (props) => {
  const { className: styles, id, name, placeholder, errors, rows } = props;

  return (
    <div className={`${styles} ${errors ? "onError" : ""}`}>
      <Field
        as="textarea"
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
      />
      <ErrorMessage className="error" name={name} component="span" />
    </div>
  );
};

FormTextareaField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.bool,
  rows: PropTypes.number.isRequired,
};

export default FormTextareaField;
