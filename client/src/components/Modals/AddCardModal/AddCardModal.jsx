import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addBoardColumnCard } from "../../../redux/boards/operations";
import { setModalClose } from "../../../redux/modals/slice";
import { capitalize, getPriorityOptions } from "../../../utils/utils";
import { notifySuccess, notifyError } from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormTextareaField from "../../common/FormTextareaField/FormTextareaField.styled";
import FormPriorityField from "../../common/FormPriorityField/FormPriorityField.styled";
import FormDeadlineField from "../../common/FormDeadlineField/FormDeadlineField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const AddCardModal = ({ className: styles }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, column } = useBoards();

  function closeModal() {
    modalRef.current.classList.add("hidden");
    setTimeout(() => dispatch(setModalClose("AddCardModal")), 500);
  }

  const priorityOptions = getPriorityOptions();
  const [startDate, setStartDate] = useState(new Date());

  const initialValues = {
    title: "",
    description: "",
    priority: priorityOptions[3],
    deadline: startDate,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "It must be at least 3 characters long")
      .max(50, "It must be less than 50 characters long")
      .required("Required *"),
    description: Yup.string()
      .trim()
      .min(5, "It must be at least 5 characters long")
      .max(400, "It must be less than 400 characters long")
      .required("Required *"),
  });

  const handleSubmit = (values, formikBag) => {
    const { setSubmitting, setFieldError, resetForm } = formikBag;
    const { title, description, priority, deadline } = values;

    setSubmitting(true);

    const boardId = board["_id"];
    const columnId = column["_id"];

    const newCard = {
      title: capitalize(title),
      description: description.trim().toLowerCase(),
      priority,
      deadline: deadline.toDateString(),
    };

    dispatch(addBoardColumnCard({ boardId, columnId, newCard }))
      .unwrap()
      .then((value) => {
        notifySuccess(value.message);
        resetForm();
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
    <Modal className={styles} closeModal={closeModal} modalRef={modalRef}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form>
            <FormTitle title="Add card" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              errors={(errors.title && touched.title) || null}
              isFocused={true}
            />
            <FormTextareaField
              id="descriptionInput"
              name="description"
              placeholder="Description"
              errors={(errors.description && touched.description) || null}
              rows={6}
            />
            <FormPriorityField />
            <FormDeadlineField
              date={startDate}
              handlerFunctions={{
                setFieldValue,
                setStartDate,
              }}
            />
            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Add"}
              isDisabled={
                isSubmitting ||
                (errors.title && touched.title) ||
                (errors.description && touched.description)
              }
              variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCardModal;
