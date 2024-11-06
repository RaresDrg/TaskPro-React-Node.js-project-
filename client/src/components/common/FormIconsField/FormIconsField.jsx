import { Field } from "formik";
import icons from "../../../assets/icons/icons.svg";
import { getIconsOptions } from "../../../utils/utils";

const FormIconsField = ({ className: styles }) => {
  const iconsOptions = getIconsOptions();

  return (
    <div className={styles}>
      <h3>Icons</h3>
      <div className="radio-options">
        {iconsOptions.map((item) => (
          <div key={item}>
            <Field type="radio" id={item} value={item} name="icon" />
            <label htmlFor={item}>
              <svg>
                <use href={`${icons}#${item}`}></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormIconsField;
