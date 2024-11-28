import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { toast } from "react-toastify";
import { capitalize, getRegex } from "../../../utils/utils";
import { useAuth } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormFileField from "../../common/FormFileField/FormFileField.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormPasswordField from "../../common/FormPasswordField/FormPasswordField.styled";
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

  const initialValues = {
    name: user.name,
    email: user.email,
    password: "",
    profilePhoto: "",
  };

  const emailRegex = getRegex("email");
  const passwordRegex = getRegex("password");

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be less than 50 characters long")
      .required("Required *"),
    email: Yup.string()
      .matches(emailRegex, { message: "Invalid email address" })
      .required("Required *"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(passwordRegex, {
        message: "Must include an uppercase, a lowercase and a digit",
      })
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { setSubmitting, setFieldError, resetForm } = formikBag;
    const { name, email, password, profilePhoto } = values;

    setIsLoading(true);
    setSubmitting(true);

    const updates = { name: capitalize(name), email, password, profilePhoto };

    dispatch(updateUser(updates))
      .unwrap()
      .then((value) => {
        toast.success(value.message);
        resetForm();
        closeModal();
      })
      .catch((error) => {
        const errorNotification =
          error?.response?.data?.message || "Internal server error";
        toast.error(errorNotification);

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
          {({ isSubmitting, touched, errors, values, setFieldValue }) => (
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
              <FormPasswordField
                id="passwordInput"
                name="password"
                placeholder="Password"
                errors={(errors.password && touched.password) || null}
                values={values.password || null}
              />
              <FormButton
                type={"submit"}
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={
                  isSubmitting ||
                  (errors.name && touched.name) ||
                  (errors.email && touched.email) ||
                  (errors.password && touched.password)
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
