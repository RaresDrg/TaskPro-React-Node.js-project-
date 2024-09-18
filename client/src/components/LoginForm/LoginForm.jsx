import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UseAnimations from "react-useanimations";
import visibility from "react-useanimations/lib/visibility";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import FormButton from "../common/FormButton/FormButton.styled";
import AuthNavigation from "../common/AuthNavigation/AuthNavigation.styled";
import "animate.css";

const LoginForm = ({ className: styles }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegex, { message: "Invalid email address" })
      .required("Required *"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(passwordRegex, {
        message: "must include an uppercase, a lowercase, a digit",
      })
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { email, password } = values;
    const { setSubmitting, setFieldError, resetForm } = formikBag;

    setSubmitting(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then((value) => {
        resetForm();
        navigate("/dashboard");
        toast.success(`Welcome, ${value.data.user.name} !`);
      })
      .catch((error) => {
        const errorNotification =
          error?.response?.data?.message || "Internal server error";
        toast.error(errorNotification);

        if (error?.response?.data?.message === "email is wrong") {
          setFieldError("email", "Invalid email address");
        }

        if (error?.response?.data?.message === "password is wrong") {
          setFieldError("password", "Invalid password");
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

            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Log In Now"}
              isDisabled={
                isSubmitting ||
                (errors.email && touched.email) ||
                (errors.password && touched.password)
              }
              variant={"greenBtn"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
