import { useDispatch } from "react-redux";
import { updateBoard } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormIconsField from "../../common/FormIconsField/FormIconsField.styled";
import FormBackgroundField from "../../common/FormBackgroundField/FormBackgroundField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const EditBoardModal = () => {
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, boardsList } = useBoards();

  const initialValues = {
    title: board.title,
    icon: board.icon,
    background: board.background.value,
  };
  const validationSchema = utils.getValidationSchema(["title"]);

  const handleSubmit = (values, formikBag) => {
    const { title, icon, background } = values;
    const updates = { title: utils.capitalize(title), icon, background };

    const hasUpdates = utils.checkUpdates(initialValues, updates);
    if (!hasUpdates) {
      closeModal();
      return;
    }

    const alreadyExist = utils.checkExistence("updateCase", boardsList, {
      title: updates.title,
      id: board["_id"],
    });
    if (alreadyExist) {
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another board"
      );
      formikBag.setSubmitting(false);
      return;
    }

    dispatch(updateBoard({ boardId: board["_id"], updates }))
      .unwrap()
      .then((value) => {
        utils.notify.success(value.message);
        closeModal();
      })
      .catch((error) => utils.notify.error(error))
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormTitle title="Edit board" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              errors={(errors.title && touched.title) || null}
              isFocused
            />
            <FormIconsField />
            <FormBackgroundField />
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

export default EditBoardModal;
