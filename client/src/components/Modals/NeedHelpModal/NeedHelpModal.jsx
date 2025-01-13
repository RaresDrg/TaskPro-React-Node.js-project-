import { useState } from "react";
import { reachCustomerSupport } from "../../../redux/auth/operations";
import { getValidationSchema, notify } from "../../../utils/utils";
import { useAuth } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormTextareaField from "../../common/FormTextareaField/FormTextareaField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner.styled";

const NeedHelpModal = ({ className: styles }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme, user } = useAuth();

  const initialValues = { email: user.email, comment: "" };
  const validationSchema = getValidationSchema(Object.keys(initialValues));

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);

    reachCustomerSupport({ comment: values.comment.trim() })
      .then((value) => {
        notify.success(value.message);
        closeModal();
      })
      .catch((error) => notify.error(error))
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
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormTitle title="Need help" />
              <FormTextField
                id="emailInput"
                name="email"
                placeholder="Email address"
                errors={(errors.email && touched.email) || null}
                isDisabled
              />
              <FormTextareaField
                id="commentInput"
                name="comment"
                placeholder="Comment"
                errors={(errors.comment && touched.comment) || null}
                rows={5}
                isFocused
              />
              <FormButton
                type={"submit"}
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={isSubmitting || (errors.comment && touched.comment)}
                variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
              />
            </Form>
          )}
        </Formik>
      </Modal>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default NeedHelpModal;
