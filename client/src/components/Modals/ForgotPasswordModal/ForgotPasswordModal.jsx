import { useState } from "react";
import { handleForgotPassword } from "../../../redux/auth/operations";
import { getValidationSchema, notify } from "../../../utils/utils";
import { Form, Formik } from "formik";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner.styled";

const ForgotPasswordModal = ({ className: styles }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = { email: "" };
  const validationSchema = getValidationSchema(Object.keys(initialValues));

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);

    handleForgotPassword({ email: values.email })
      .then((value) => {
        notify.success(value.message);
        closeModal();
      })
      .catch((error) => {
        notify.error(error);

        if (error?.response?.status === 404) {
          formikBag.setFieldError("email", "Invalid email address");
        }
      })
      .finally(() => {
        setIsLoading(false);
        formikBag.setSubmitting(false);
      });
  };

  return (
    <>
      <Modal className={styles}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <FormTitle title="Forgot password" />
              <FormTextField
                id="emailInput"
                name="email"
                placeholder="Email of your account"
                errors={(errors.email && touched.email) || null}
                isFocused
              />
              <FormButton
                type={"submit"}
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={isSubmitting || (errors.email && touched.email)}
                variant={"greenBtn"}
              />
            </Form>
          )}
        </Formik>
      </Modal>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ForgotPasswordModal;
