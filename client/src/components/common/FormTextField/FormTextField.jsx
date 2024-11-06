import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

const FormTextField = (props) => {
  const { className: styles, id, name, placeholder, errors } = props;

  return (
    <div className={`${styles} ${errors ? "onError" : ""}`}>
      <Field type="text" id={id} name={name} placeholder={placeholder} />
      <ErrorMessage className="error" name={name} component="span" />
    </div>
  );
};

FormTextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.bool,
};

export default FormTextField;
