import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { reachCustomerSupport } from "../../../redux/auth/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { notifySuccess, notifyError } from "../../../utils/utils";
import { useAuth } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormTextareaField from "../../common/FormTextareaField/FormTextareaField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner.styled";

const NeedHelpModal = ({ className: styles }) => {
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef();
  const dispatch = useDispatch();
  const { theme, user } = useAuth();

  useEffect(() => {
    document.querySelector("#emailInput").disabled = true;
  }, []);

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("NeedHelpModal")), 500);
  }

  const initialValues = {
    email: user.email,
    comment: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .oneOf([`${user.email}`], "Must provide the right email for this account")
      .required("Required *"),
    comment: Yup.string()
      .trim()
      .min(10, "It must be at least 10 characters long")
      .max(400, "It must be less than 400 characters long")
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);
    formikBag.setSubmitting(true);

    reachCustomerSupport({ comment: values.comment.trim() })
      .then((value) => {
        notifySuccess(value.message);
        formikBag.resetForm();
        closeModal();
      })
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => {
        setIsLoading(false);
        formikBag.setSubmitting(false);
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
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormTitle title="Need help" />
              <FormTextField
                id="emailInput"
                name="email"
                placeholder="Email address"
                errors={(errors.email && touched.email) || null}
              />
              <FormTextareaField
                id="commentInput"
                name="comment"
                placeholder="Comment"
                errors={(errors.comment && touched.comment) || null}
                rows={5}
                isFocused={true}
              />
              <FormButton
                type={"submit"}
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={
                  isSubmitting ||
                  (errors.email && touched.email) ||
                  (errors.comment && touched.comment)
                }
                variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
              />
            </Form>
          )}
        </Formik>
      </Modal>

      {isLoading && createPortal(<LoadingSpinner />, document.body)}
    </>
  );
};

export default NeedHelpModal;
