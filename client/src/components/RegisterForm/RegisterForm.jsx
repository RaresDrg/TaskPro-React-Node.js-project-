import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UseAnimations from "react-useanimations";
import visibility from "react-useanimations/lib/visibility";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import FormButton from "../common/FormButton/FormButton.styled";
import AuthNavigation from "../common/AuthNavigation/AuthNavigation.styled";
import "animate.css";

const RegisterForm = ({ className: styles }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confimPasswordIsVisible, setConfimPasswordIsVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters long")
      .required("Required *"),
    email: Yup.string()
      .matches(emailRegex, { message: "Invalid email address" })
      .required("Required *"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(passwordRegex, {
        message: "Must include an uppercase, a lowercase, a digit",
      })
      .required("Required *"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password doesn't match")
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { name, email, password } = values;
    const { setSubmitting, setFieldError, resetForm } = formikBag;

    setSubmitting(true);

    dispatch(register({ name: name.trim(), email, password }))
      .unwrap()
      .then(() => {
        resetForm();
        navigate("/dashboard");
        toast.success(`Welcome, ${name} !`);
      })
      .catch((error) => {
        const errorNotification =
          error?.response?.data?.message || "Internal server error";
        toast.error(errorNotification);

        if (error?.response?.status === 409) {
          setFieldError("email", "Invalid email address");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={`${styles} animate__animated animate__zoomIn`}>
      <AuthNavigation />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, values, touched }) => (
          <Form autoComplete="off">
            <div
              className={`field ${
                touched.name && errors.name ? "onError" : ""
              }`}
            >
              <Field
                id="nameInput"
                type="text"
                name="name"
                placeholder="Please, enter your name !"
              />
              <ErrorMessage className="error" name="name" component="span" />
            </div>

            <div
              className={`field ${
                touched.email && errors.email ? "onError" : ""
              }`}
            >
              <Field
                id="emailInput"
                type="email"
                name="email"
                placeholder="Please, enter your email !"
              />
              <ErrorMessage className="error" name="email" component="span" />
            </div>

            <div
              className={`field ${
                touched.password && errors.password ? "onError" : ""
              }`}
            >
              <Field
                id="passwordInput"
                type={passwordIsVisible ? "text" : "password"}
                name="password"
                placeholder="Please, enter your password !"
              />
              <ErrorMessage
                className="error"
                name="password"
                component="span"
              />
              {values.password && (
                <UseAnimations
                  animation={visibility}
                  onClick={() => {
                    !passwordIsVisible &&
                      document.querySelector("#passwordInput").focus();
                    setPasswordIsVisible((prev) => !prev);
                  }}
                  size={30}
                  className="showPassword"
                  strokeColor="var(--text-color-white)"
                  speed={2}
                />
              )}
            </div>

            <div
              className={`field ${
                touched.confirmPassword &&
                (errors.confirmPassword || errors.password)
                  ? "onError"
                  : ""
              }`}
            >
              <Field
                id="confirmPasswordInput"
                type={confimPasswordIsVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Please, confirm your password !"
              />
              <ErrorMessage
                className="error"
                name="confirmPassword"
                component="span"
              />
              {values.confirmPassword && (
                <UseAnimations
                  animation={visibility}
                  onClick={() => {
                    !confimPasswordIsVisible &&
                      document.querySelector("#confirmPasswordInput").focus();
                    setConfimPasswordIsVisible((prev) => !prev);
                  }}
                  size={30}
                  className="showPassword"
                  strokeColor="var(--text-color-white)"
                  speed={2}
                />
              )}
            </div>

            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Register Now"}
              isDisabled={
                isSubmitting ||
                (errors.name && touched.name) ||
                (errors.email && touched.email) ||
                (errors.password && touched.password) ||
                (errors.confirmPassword && touched.confirmPassword)
              }
              variant={"greenBtn"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
