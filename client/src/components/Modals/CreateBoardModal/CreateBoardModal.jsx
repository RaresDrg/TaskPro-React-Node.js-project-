import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBoard } from "../../../redux/boards/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { capitalize, notifySuccess, notifyError } from "../../../utils/utils";
import { getIconsOptions, getBgOptions } from "../../../utils/utils";
import { useAuth } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormIconsField from "../../common/FormIconsField/FormIconsField.styled";
import FormBackgroundField from "../../common/FormBackgroundField/FormBackgroundField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const CreateBoardModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useAuth();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("CreateBoardModal")), 500);
  }

  const iconsOptions = getIconsOptions();
  const bgOptions = getBgOptions();

  const initialValues = {
    title: "",
    icon: iconsOptions[0],
    background: bgOptions[0],
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "Title must be at least 3 characters long")
      .max(50, "Title must be less than 50 characters long")
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { title, icon, background } = values;
    const { setSubmitting, setFieldError, resetForm } = formikBag;

    setSubmitting(true);
    const newBoard = { title: capitalize(title), icon, background };

    dispatch(addBoard(newBoard))
      .unwrap()
      .then((value) => {
        navigate(`${value.data.board["_id"]}`);
        resetForm();
        notifySuccess(value.message);
        closeModal();
      })
      .catch((error) => {
        notifyError(error);

        if (error?.response?.status === 409) {
          setFieldError("title", "Invalid title");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Modal closeModal={closeModal} modalRef={modalRef}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormTitle title="New board" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              errors={(errors.title && touched.title) || null}
              isFocused={true}
            />
            <FormIconsField />
            <FormBackgroundField />
            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Create"}
              isDisabled={isSubmitting || (errors.title && touched.title)}
              variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateBoardModal;
