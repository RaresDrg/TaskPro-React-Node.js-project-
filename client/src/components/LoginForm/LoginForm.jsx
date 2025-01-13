import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { setModalOpen } from "../../redux/modals/slice";
import { getValidationSchema, notify } from "../../utils/utils";
import { Form, Formik } from "formik";
import AuthNavigation from "../common/AuthNavigation/AuthNavigation.styled";
import FormTextField from "../common/FormTextField/FormTextField.styled";
import FormPasswordField from "../common/FormPasswordField/FormPasswordField.styled";
import FormButton from "../common/FormButton/FormButton.styled";

const LoginForm = ({ className: styles }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = getValidationSchema(["email", "loginPassword"]);

  const handleSubmit = (values, formikBag) => {
    const { email, password } = values;

    dispatch(login({ email, password }))
      .unwrap()
      .then((value) => notify.success(`Welcome, ${value.data.user.name} !`))
      .catch((error) => {
        notify.error(error);

        if (
          error?.response?.data?.message ===
          "There is no account associated with this email address"
        ) {
          formikBag.setFieldError("email", "Invalid email address");
        }

        if (error?.response?.data?.message === "Password is wrong") {
          formikBag.setFieldError("password", "Invalid password");
        }
      })
      .finally(() => formikBag.setSubmitting(false));
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
          <Form>
            <FormTextField
              id="emailInput"
              name="email"
              placeholder="Email"
              errors={(errors.email && touched.email) || null}
              isFocused
            />
            <FormPasswordField
              id="passwordInput"
              name="password"
              placeholder="Password"
              errors={(errors.password && touched.password) || null}
              values={values.password || null}
            />
            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Log In"}
              isDisabled={
                isSubmitting ||
                (errors.email && touched.email) ||
                (errors.password && touched.password)
              }
              variant={"greenBtn"}
            />
            <button
              type="button"
              className="forgotBtn"
              onClick={() => dispatch(setModalOpen("ForgotPasswordModal"))}
            >
              Forgot password ?
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
