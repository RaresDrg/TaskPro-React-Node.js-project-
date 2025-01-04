import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/auth/operations";
import { setModalOpen } from "../../redux/modals/slice";
import { getRegex, notifyWarning } from "../../utils/utils";
import { notifySuccess, notifyError } from "../../utils/utils";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormTitle from "../common/FormTitle/FormTitle.styled";
import FormPasswordField from "../common/FormPasswordField/FormPasswordField.styled";
import FormButton from "../common/FormButton/FormButton.styled";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner.styled";

const ResetPasswordForm = ({ className: styles, validationToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("#passwordInput").focus();
  }, []);

  const initialValues = { password: "", confirmPassword: "" };
  const passwordRegex = getRegex("password");
  const validationSchema = Yup.object({
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
    const { setSubmitting, resetForm } = formikBag;

    setIsLoading(true);
    setSubmitting(true);

    dispatch(changePassword({ validationToken, newPassword: values.password }))
      .unwrap()
      .then((value) => {
        resetForm();
        notifySuccess(value.message);
      })
      .catch((error) => {
        if (error?.status === 403 || error?.status === 404) {
          notifyWarning(
            "The link to reset your password has expired. Please initiate a new password reset request."
          );
          navigate("/login", { replace: true });
          dispatch(setModalOpen("ForgotPasswordModal"));
          return;
        }

        notifyError(error);
      })
      .finally(() => {
        setIsLoading(false);
        setSubmitting(false);
      });
  };

  return (
    <>
      <div className={`${styles} animate__animated animate__zoomIn`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, touched }) => (
            <Form>
              <FormTitle title="Change password" />
              <FormPasswordField
                id="passwordInput"
                name="password"
                placeholder="New Password"
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
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={
                  isSubmitting ||
                  (errors.password && touched.password) ||
                  (errors.confirmPassword && touched.confirmPassword)
                }
                variant={"greenBtn"}
              />
            </Form>
          )}
        </Formik>
      </div>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

ResetPasswordForm.propTypes = {
  validationToken: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
