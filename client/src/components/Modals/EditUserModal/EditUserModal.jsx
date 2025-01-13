import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";
import * as utils from "../../../utils/utils";
import { useAuth } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormFileField from "../../common/FormFileField/FormFileField.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner.styled";

const EditUserModal = ({ className: styles }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { theme, user } = useAuth();

  const initialValues = {
    name: user.name,
    email: user.email,
    profilePhoto: "",
  };
  const validationSchema = utils.getValidationSchema(["name", "email"]);

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);

    const updates = {
      name: utils.capitalize(values.name),
      email: values.email.trim(),
      profilePhoto: values.profilePhoto,
    };

    const hasUpdates = utils.checkUpdates(initialValues, updates);
    if (!hasUpdates) {
      closeModal();
      setIsLoading(false);
      return;
    }

    dispatch(updateUser(updates))
      .unwrap()
      .then((value) => {
        utils.notify.success(value.message);
        closeModal();
      })
      .catch((error) => {
        utils.notify.error(error);

        if (error?.response?.status === 409) {
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
          {({ isSubmitting, touched, errors, setFieldValue }) => (
            <Form>
              <FormTitle title="Edit profile" />
              <FormFileField setFieldValue={setFieldValue} />
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
                isDisabled={user.isGoogleUser}
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

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default EditUserModal;
