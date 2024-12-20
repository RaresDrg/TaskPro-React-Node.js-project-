import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { notifySuccess, notifyError } from "../../utils/utils";
import { capitalize, getRegex } from "../../utils/utils";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AuthNavigation from "../common/AuthNavigation/AuthNavigation.styled";
import FormTextField from "../common/FormTextField/FormTextField.styled";
import FormPasswordField from "../common/FormPasswordField/FormPasswordField.styled";
import FormButton from "../common/FormButton/FormButton.styled";

const RegisterForm = ({ className: styles }) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const emailRegex = getRegex("email");
  const passwordRegex = getRegex("password");

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
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
    const { setSubmitting, setFieldError, resetForm } = formikBag;
    const { email, password } = values;

    setSubmitting(true);

    const name = capitalize(values.name);

    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        resetForm();
        notifySuccess(`Welcome, ${name} !`);
      })
      .catch((error) => {
        notifyError(error);

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
          <Form>
            <FormTextField
              id="nameInput"
              name="name"
              placeholder="Name"
              errors={(errors.name && touched.name) || null}
              isFocused={true}
            />
            <FormTextField
              id="emailInput"
              name="email"
              placeholder="Email"
              errors={(errors.email && touched.email) || null}
            />
            <FormPasswordField
              id="passwordInput"
              name="password"
              placeholder="Password"
              errors={(errors.password && touched.password) || null}
              values={values.password || null}
            />
            <FormPasswordField
              id="confirmPasswordInput"
              name="confirmPassword"
              placeholder="Please, confirm your password"
              errors={
                Boolean(
                  touched.confirmPassword &&
                    (errors.confirmPassword || errors.password)
                ) || null
              }
              values={values.confirmPassword || null}
            />
            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Register"}
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
