import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import UseAnimations from "react-useanimations";
import visibility from "react-useanimations/lib/visibility";

const FormPasswordField = (props) => {
  const { className: styles, id, name, placeholder, errors, values } = props;
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    !isVisible && document.querySelector(`#${id}`).focus();
    setIsVisible((prev) => !prev);
  }

  return (
    <div className={`${styles} ${errors ? "onError" : ""}`}>
      <Field
        type={isVisible ? "text" : "password"}
        id={id}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage className="error" name={name} component="span" />
      {values && (
        <UseAnimations
          animation={visibility}
          onClick={handleClick}
          size={30}
          className="showPassword"
          strokeColor="currentColor"
          speed={2}
        />
      )}
    </div>
  );
};

FormPasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.bool,
  values: PropTypes.string,
};

export default FormPasswordField;
