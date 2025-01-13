import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBoard } from "../../../redux/boards/operations";
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

const AddBoardModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useAuth();
  const { boardsList } = useBoards();

  const initialValues = {
    title: "",
    icon: utils.getIconsOptions()[0],
    background: utils.getBgOptions()[0],
  };
  const validationSchema = utils.getValidationSchema(["title"]);

  const handleSubmit = (values, formikBag) => {
    const { title, icon, background } = values;
    const newBoard = { title: utils.capitalize(title), icon, background };

    const alreadyExist = utils.checkExistence("addCase", boardsList, newBoard);
    if (alreadyExist) {
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another board"
      );
      formikBag.setSubmitting(false);
      return;
    }

    dispatch(addBoard(newBoard))
      .unwrap()
      .then((value) => {
        navigate(`${value.data.board["_id"]}`);
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
            <FormTitle title="New board" />
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

export default AddBoardModal;
