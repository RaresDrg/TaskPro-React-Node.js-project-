import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import UseAnimations from "react-useanimations";
import visibility from "react-useanimations/lib/visibility";

const FormPasswordField = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    !isVisible && document.querySelector(`#${props.id}`).focus();
    setIsVisible((prev) => !prev);
  }

  return (
    <div className={`${props.className} ${props.errors ? "onError" : ""}`}>
      <Field
        type={isVisible ? "text" : "password"}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        autoFocus={props.isFocused}
      />
      <ErrorMessage className="error" name={props.name} component="span" />
      {props.values && (
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
  isFocused: PropTypes.bool,
};

export default FormPasswordField;
