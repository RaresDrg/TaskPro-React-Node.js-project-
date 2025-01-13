import { useDispatch } from "react-redux";
import { updateBoardColumn } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const EditColumnModal = () => {
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board, column } = useBoards();

  const initialValues = { title: column.title };
  const validationSchema = utils.getValidationSchema(["title"]);

  const handleSubmit = (values, formikBag) => {
    const updates = { title: utils.capitalize(values.title) };

    const hasUpdates = utils.checkUpdates(initialValues, updates);
    if (!hasUpdates) {
      closeModal();
      return;
    }

    const alreadyExist = utils.checkExistence("updateCase", board.columns, {
      title: updates.title,
      id: column["_id"],
    });
    if (alreadyExist) {
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another column"
      );
      formikBag.setSubmitting(false);
      return;
    }

    const boardId = board["_id"];
    const columnId = column["_id"];

    dispatch(updateBoardColumn({ boardId, columnId, updates }))
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
            <FormTitle title="Edit column" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              errors={(errors.title && touched.title) || null}
              isFocused
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
