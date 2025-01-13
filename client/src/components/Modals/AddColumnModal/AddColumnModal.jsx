import { useDispatch } from "react-redux";
import { addBoardColumn } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { Form, Formik } from "formik";
import { closeModal } from "../../common/Modal/Modal";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const AddColumnModal = () => {
  const dispatch = useDispatch();
  const { theme } = useAuth();
  const { board } = useBoards();

  const initialValues = { title: "" };
  const validationSchema = utils.getValidationSchema(["title"]);

  const handleSubmit = (values, formikBag) => {
    const column = { title: utils.capitalize(values.title) };

    const alreadyExist = utils.checkExistence("addCase", board.columns, column);
    if (alreadyExist) {
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another column"
      );
      formikBag.setSubmitting(false);
      return;
    }

    dispatch(addBoardColumn({ boardId: board["_id"], column }))
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
            <FormTitle title="Add column" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              errors={(errors.title && touched.title) || null}
              isFocused
            />
            <FormButton
              type={"submit"}
              text={isSubmitting ? "Loading..." : "Add"}
              isDisabled={isSubmitting || (errors.title && touched.title)}
              variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddColumnModal;
