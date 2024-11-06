import { Field } from "formik";
import { getBgOptions, getBg } from "../../../utils/utils";

const FormBackgroundField = ({ className: styles }) => {
  const bgOptions = getBgOptions();

  return (
    <div className={styles}>
      <h3>Background</h3>
      <div className="radio-options">
        {bgOptions.map((item) => (
          <div key={item}>
            <Field type={"radio"} id={item} value={item} name="background" />
            <label htmlFor={item}>
              <img src={getBg("micro", item)} alt="background" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBackgroundField;
