import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateBoardColumn } from "../../../redux/boards/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { toast } from "react-toastify";
import { capitalize } from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const EditColumnModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, column } = useBoards();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("EditColumnModal")), 500);
  }

  const initialValues = {
    title: column.title,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters long")
      .max(50, "Title must be less than 50 characters long")
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { setSubmitting, setFieldError, resetForm } = formikBag;

    setSubmitting(true);

    const boardId = board["_id"];
    const columnId = column["_id"];
    const updates = { title: capitalize(values.title) };

    dispatch(updateBoardColumn({ boardId, columnId, updates }))
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
            <FormTitle title="Edit column" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              errors={(errors.title && touched.title) || null}
            />
            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Edit"}
              isDisabled={isSubmitting || (errors.title && touched.title)}
              variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditColumnModal;
