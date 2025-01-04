import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setModalClose } from "../../../redux/modals/slice";
import { handleForgotPassword } from "../../../redux/auth/operations";
import { getRegex, notifySuccess, notifyError } from "../../../utils/utils";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner.styled";

const ForgotPasswordModal = ({ className: styles }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const modalRef = useRef();
  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("ForgotPasswordModal")), 500);
  }

  const initialValues = { email: "" };
  const emailRegex = getRegex("email");
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .matches(emailRegex, { message: "Invalid email address" })
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { setSubmitting, setFieldError, resetForm } = formikBag;

    setIsLoading(true);
    setSubmitting(true);

    handleForgotPassword({ email: values.email })
      .then((value) => {
        notifySuccess(value.message);
        resetForm();
        closeModal();
      })
      .catch((error) => {
        notifyError(error);

        if (error?.response?.status === 404) {
          setFieldError("email", "Invalid email address");
        }
      })
      .finally(() => {
        setIsLoading(false);
        setSubmitting(false);
      });
  };

  return (
    <>
      <Modal className={styles} closeModal={closeModal} modalRef={modalRef}>
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
                isFocused={true}
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
