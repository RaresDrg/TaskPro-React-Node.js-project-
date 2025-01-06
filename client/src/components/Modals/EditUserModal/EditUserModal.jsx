import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { capitalize, getRegex } from "../../../utils/utils";
import { notifySuccess, notifyError } from "../../../utils/utils";
import { useAuth } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormFileField from "../../common/FormFileField/FormFileField.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner.styled";

const EditUserModal = ({ className: styles }) => {
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef();
  const dispatch = useDispatch();
  const { theme, user } = useAuth();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("EditUserModal")), 500);
  }

  useEffect(() => {
    if (user.isGoogleUser) {
      document.querySelector("#emailInput").disabled = true;
    }
  }, []);

  const initialValues = {
    name: user.name,
    email: user.email,
    profilePhoto: "",
  };

  const emailRegex = getRegex("email");

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be less than 50 characters long")
      .required("Required *"),
    email: Yup.string()
      .trim()
      .matches(emailRegex, { message: "Invalid email address" })
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { setSubmitting, setFieldError, resetForm } = formikBag;
    const { name, email, profilePhoto } = values;

    setIsLoading(true);

    const updates = { name: capitalize(name), email, profilePhoto };
    dispatch(updateUser(updates))
      .unwrap()
      .then((value) => {
        notifySuccess(value.message);
        resetForm();
        closeModal();
      })
      .catch((error) => {
        notifyError(error);

        if (error?.response?.status === 409) {
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
          {({ isSubmitting, touched, errors, setFieldValue }) => (
            <Form>
              <FormTitle title="Edit profile" />
              <FormFileField setFieldValue={setFieldValue} />
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
              <FormButton
                type={"submit"}
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={
                  isSubmitting ||
                  (errors.name && touched.name) ||
                  (errors.email && touched.email)
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

export default EditUserModal;
