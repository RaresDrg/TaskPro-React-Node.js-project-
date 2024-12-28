import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { getRegex, notifySuccess, notifyError } from "../../utils/utils";
import { Form, Formik } from "formik";
import * as Yup from "yup";
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

  const emailRegex = getRegex("email");

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .matches(emailRegex, { message: "Invalid email address" })
      .required("Required *"),
    password: Yup.string().required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { setSubmitting, setFieldError, resetForm } = formikBag;
    const { email, password } = values;

    setSubmitting(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then((value) => {
        resetForm();
        notifySuccess(`Welcome, ${value.data.user.name} !`);
      })
      .catch((error) => {
        notifyError(error);

        if (
          error?.response?.data?.message ===
          "there is no account associated with this email address"
        ) {
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
          <Form>
            <FormTextField
              id="emailInput"
              name="email"
              placeholder="Email"
              errors={(errors.email && touched.email) || null}
              isFocused={true}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
