import { useDispatch } from "react-redux";
import { updateBoardColumnCard } from "../../../redux/boards/operations";
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

const EditCardModal = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, card } = useBoards();

  const initialValues = {
    title: card.title,
    description: card.description,
    priority: card.priority,
    deadline: card.deadline,
  };
  const validationSchema = utils.getValidationSchema(["title", "description"]);

  const handleSubmit = (values, formikBag) => {
    const updates = {
      title: utils.capitalize(values.title),
      description: values.description.trim().toLowerCase(),
      priority: values.priority,
      deadline: new Date(values.deadline).toDateString(),
    };

    const hasUpdates = utils.checkUpdates(initialValues, updates);
    if (!hasUpdates) {
      closeModal();
      return;
    }

    const targetedColumn = board.columns.find((column) =>
      column.cards.find((item) => item["_id"] === card["_id"])
    );

    const alreadyExist = utils.checkExistence(
      "updateCase",
      targetedColumn.cards,
      { title: updates.title, id: card["_id"] }
    );
    if (alreadyExist) {
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another card"
      );
      formikBag.setSubmitting(false);
      return;
    }

    const boardId = board["_id"];
    const columnId = targetedColumn["_id"];
    const cardId = card["_id"];

    dispatch(updateBoardColumnCard({ boardId, columnId, cardId, updates }))
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
            <FormTitle title="Edit card" />
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
            <FormDeadlineField
              setFieldValue={setFieldValue}
              deadline={card.deadline}
            />
            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Edit"}
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

export default EditCardModal;
