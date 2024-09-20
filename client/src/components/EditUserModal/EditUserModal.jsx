import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/auth/operations";
import { openEditUserModal } from "../../redux/modals/slice";
import { toast } from "react-toastify";

import CloseBtn from "../common/CloseBtn/CloseBtn.styled";
import FormButton from "../common/FormButton/FormButton.styled";

import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UseAnimations from "react-useanimations";
import visibility from "react-useanimations/lib/visibility";
import icons from "../../assets/icons/icons.svg";

const EditUserModal = ({ className: styles }) => {
  const modalRef = useRef();
  const { theme, user } = useAuth();
  const dispatch = useDispatch();

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [file, setFile] = useState(user.profilePhotoUrl);

  useEffect(() => {
    setTimeout(() => modalRef.current.classList.add("visible"), 0);
    document.addEventListener("keydown", handleClose);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleClose);
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleClose(e) {
    if (e.key === "Escape" || e.currentTarget === e.target) {
      closeModal();
    }
  }

  function closeModal() {
    modalRef.current.classList.remove("visible");
    setTimeout(() => dispatch(openEditUserModal(false)), 500);
  }

  const initialValues = {
    name: user.name,
    email: user.email,
    password: "",
    profilePhoto: "",
  };

  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
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
    const { name, email, password, profilePhoto } = values;
    const { setSubmitting, setFieldError, resetForm } = formikBag;

    document.body.style.pointerEvents = "none";
    setSubmitting(true);

    dispatch(updateUser({ name: name.trim(), email, password, profilePhoto }))
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
        setSubmitting(false);
        document.body.style.pointerEvents = "auto";
      });
  };

  return (
    <div className={styles} ref={modalRef} onMouseDown={handleClose}>
      <div className={`modal-content ${theme}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, touched, setFieldValue }) => (
            <Form>
              <CloseBtn handlerFunction={() => closeModal()} />
              <h1 className={theme}>Edit profile</h1>

              <div className={`photoField`}>
                {file ? (
                  <img src={file} alt="profile" />
                ) : (
                  <svg>
                    <use
                      href={
                        (theme === "dark" && `${icons}#icon-no-profile-dark`) ||
                        (theme === "light" &&
                          `${icons}#icon-no-profile-light`) ||
                        (theme === "violet" &&
                          `${icons}#icon-no-profile-violet`)
                      }
                    ></use>
                  </svg>
                )}

                <label htmlFor="fileInput" className={theme}>
                  <svg>
                    <use href={`${icons}#icon-plus`}></use>
                  </svg>
                </label>
                <Field
                  id="fileInput"
                  type="file"
                  name="profilePhoto"
                  accept="image/png, image/jpeg"
                  value=""
                  onChange={(e) => {
                    if (e.target.files[0].size > 5000000) {
                      toast.error(
                        "Error! The file is larger than the allowed 5 MB limit."
                      );
                      return;
                    }

                    setFile(URL.createObjectURL(e.target.files[0]));
                    setFieldValue("profilePhoto", e.target.files[0]);
                  }}
                />
              </div>

              <div
                className={`field ${
                  touched.name && errors.name ? "onError" : ""
                }`}
              >
                <Field
                  className={theme}
                  id="nameInput"
                  type="text"
                  name="name"
                  placeholder="Please, enter your name !"
                />
                <ErrorMessage className="error" name="name" component="span" />
              </div>

              <div
                className={`field ${
                  touched.email && errors.email ? "onError" : ""
                }`}
              >
                <Field
                  className={theme}
                  id="emailInput"
                  type="email"
                  name="email"
                  placeholder="Please, enter your email !"
                />
                <ErrorMessage className="error" name="email" component="span" />
              </div>

              <div
                className={`field ${
                  touched.password && errors.password ? "onError" : ""
                }`}
              >
                <Field
                  className={theme}
                  id="passwordInput"
                  type={passwordIsVisible ? "text" : "password"}
                  name="password"
                  placeholder="Please, enter your password !"
                />
                <ErrorMessage
                  className="error"
                  name="password"
                  component="span"
                />
                {values.password && (
                  <UseAnimations
                    animation={visibility}
                    onClick={() => {
                      !passwordIsVisible &&
                        document.querySelector("#passwordInput").focus();
                      setPasswordIsVisible((prev) => !prev);
                    }}
                    size={30}
                    className="showPassword"
                    strokeColor={`${
                      theme === "dark"
                        ? "var(--text-color-white)"
                        : "var(--text-color-black)"
                    }`}
                    speed={2}
                  />
                )}
              </div>

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
      </div>
    </div>
  );
};

export default EditUserModal;
