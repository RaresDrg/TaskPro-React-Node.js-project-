import PropTypes from "prop-types";
import { Field } from "formik";
import { useState } from "react";
import { useAuth } from "../../../hooks/hooks";
import { toast } from "react-toastify";
import icons from "../../../assets/icons/icons.svg";

const FormFileField = ({ className: styles, setFieldValue }) => {
  const { user, theme } = useAuth();
  const [file, setFile] = useState(user.profilePhotoUrl);

  function handleFileUploaded(e) {
    if (e.target.files[0].size > 5000000) {
      toast.error("Error: The file is larger than the allowed 5 MB limit.");
      return;
    }

    setFile(URL.createObjectURL(e.target.files[0]));
    setFieldValue("profilePhoto", e.target.files[0]);
  }

  return (
    <div className={styles}>
      {file ? (
        <img src={file} alt="profile" />
      ) : (
        <svg>
          <use
            href={
              (theme === "dark" && `${icons}#icon-no-profile-dark`) ||
              (theme === "light" && `${icons}#icon-no-profile-light`) ||
              (theme === "violet" && `${icons}#icon-no-profile-violet`)
            }
          ></use>
        </svg>
      )}

      <Field
        id="fileInput"
        type="file"
        name="profilePhoto"
        accept="image/*"
        value=""
        onChange={handleFileUploaded}
      />
      <label htmlFor="fileInput">
        <svg>
          <use href={`${icons}#icon-plus`}></use>
        </svg>
      </label>
    </div>
  );
};

FormFileField.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};

export default FormFileField;
