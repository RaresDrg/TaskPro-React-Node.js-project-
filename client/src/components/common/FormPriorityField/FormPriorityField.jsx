import { Field } from "formik";
import { getPriorityOptions } from "../../../utils/utils";

const FormPriorityField = ({ className: styles }) => {
  const priorityOptions = getPriorityOptions();

  return (
    <div className={styles}>
      <h3>Label color</h3>
      <div className="radio-options">
        {priorityOptions.map((item) => (
          <Field key={item} type={"radio"} value={item} name="priority" />
        ))}
      </div>
    </div>
  );
};

export default FormPriorityField;
