import { useDispatch } from "react-redux";
import { addBoardColumnCard } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormTextareaField from "../../common/FormTextareaField/FormTextareaField.styled";
import FormPriorityField from "../../common/FormPriorityField/FormPriorityField.styled";
import FormDeadlineField from "../../common/FormDeadlineField/FormDeadlineField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const AddCardModal = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, column } = useBoards();

  const initialValues = {
    title: "",
    description: "",
    priority: utils.getPriorityOptions()[3],
    deadline: new Date(),
  };
  const validationSchema = utils.getValidationSchema(["title", "description"]);

  const handleSubmit = (values, formikBag) => {
    const newCard = {
      title: utils.capitalize(values.title),
      description: values.description.trim().toLowerCase(),
      priority: values.priority,
      deadline: values.deadline.toDateString(),
    };

    const alreadyExist = utils.checkExistence("addCase", column.cards, newCard);
    if (alreadyExist) {
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another card"
      );
      formikBag.setSubmitting(false);
      return;
    }

    const boardId = board["_id"];
    const columnId = column["_id"];

    dispatch(addBoardColumnCard({ boardId, columnId, newCard }))
      .unwrap()
      .then((value) => {
        utils.notify.success(value.message);
        closeModal();
      })
      .catch((error) => utils.notify.error(error))
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <Modal className={styles}>
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
              isFocused
            />
            <FormTextareaField
              id="descriptionInput"
              name="description"
              placeholder="Description"
              errors={(errors.description && touched.description) || null}
              rows={6}
            />
            <FormPriorityField />
            <FormDeadlineField setFieldValue={setFieldValue} />
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
