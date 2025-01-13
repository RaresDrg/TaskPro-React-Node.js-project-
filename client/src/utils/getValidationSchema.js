import * as Yup from "yup";

const EMAIL_REGEX = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const VALIDATIONS_MAP = {
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Required *"),
  email: Yup.string()
    .trim()
    .matches(EMAIL_REGEX, { message: "Invalid email address" })
    .required("Required *"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(PASSWORD_REGEX, {
      message: "Must include an uppercase, a lowercase, a digit",
    })
    .required("Required *"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password doesn't match")
    .required("Required *"),
  loginPassword: Yup.string().required("Required *"),
  comment: Yup.string()
    .trim()
    .min(10, "It must be at least 10 characters long")
    .max(400, "It must be less than 400 characters long")
    .required("Required *"),
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be less than 50 characters long")
    .required("Required *"),
  description: Yup.string()
    .trim()
    .min(5, "It must be at least 5 characters long")
    .max(400, "It must be less than 400 characters long")
    .required("Required *"),
};

export function getValidationSchema(config) {
  const validationSchema = config.reduce((acc, item) => {
    if (item === "loginPassword") {
      acc.password = VALIDATIONS_MAP.loginPassword;
      return acc;
    }

    if (VALIDATIONS_MAP[item]) {
      acc[item] = VALIDATIONS_MAP[item];
    }

    return acc;
  }, {});

  return Yup.object(validationSchema);
}
