import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { capitalize, getValidationSchema, notify } from "../../utils/utils";
import { Form, Formik } from "formik";
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
  const validationSchema = getValidationSchema(Object.keys(initialValues));

  const handleSubmit = (values, formikBag) => {
    const { email, password } = values;
    const name = capitalize(values.name);

    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => notify.success(`Welcome, ${name} !`))
      .catch((error) => {
        notify.error(error);

        if (error?.response?.status === 409) {
          formikBag.setFieldError("email", "Invalid email address");
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
              id="nameInput"
              name="name"
              placeholder="Name"
              errors={(errors.name && touched.name) || null}
              isFocused
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
