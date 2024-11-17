import bcrypt from "bcrypt";

function handleInvalidIdError(res) {
  res
    .status(400)
    .json({ status: "error", code: 400, message: "invalid id value" });
}

function handleValidationError(res, errorMessage) {
  res.status(400).json({ status: "error", code: 400, message: errorMessage });
}

function handleDuplicateEmail(res) {
  res.status(409).json({
    status: "error",
    code: 409,
    message: "You can't use this email. It belongs to another account",
  });
}

function encrypt(text) {
  const salt = bcrypt.genSaltSync(10);
  const encryptedText = bcrypt.hashSync(text, salt);

  return encryptedText;
}

function handleBoardsSchema(property) {
  if (property === "icon") {
    const iconsOptions = [
      "icon-project",
      "icon-star",
      "icon-loading",
      "icon-puzzlePiece",
      "icon-container",
      "icon-lightning",
      "icon-colors",
      "icon-hexagon",
    ];

    return iconsOptions;
  }

  if (property === "background") {
    const bgOptions = [
      "bg-default",
      "bg-1",
      "bg-2",
      "bg-3",
      "bg-4",
      "bg-5",
      "bg-6",
      "bg-7",
      "bg-8",
      "bg-9",
      "bg-10",
      "bg-11",
      "bg-12",
      "bg-13",
      "bg-14",
      "bg-15",
    ];

    return bgOptions;
  }

  if (property === "priority") {
    const iconsOptions = ["low", "medium", "high", "without"];

    return iconsOptions;
  }
}

function getBackgroundSrc(background) {
  if (background === "bg-default") return null;

  const baseURL =
    "https://res.cloudinary.com/db73szjbz/image/upload/TaskPro/assets/backgrounds/";

  const backgroundSrc = {
    mobile: `${baseURL}/mobile/${background}`,
    tablet: `${baseURL}/tablet/${background}`,
    desktop: `${baseURL}/desktop/${background}`,
    mobile_2x: `${baseURL}/mobile/${background}-2x`,
    tablet_2x: `${baseURL}/tablet/${background}-2x`,
    desktop_2x: `${baseURL}/desktop/${background}-2x`,
  };

  return backgroundSrc;
}

const utils = {
  handleInvalidIdError,
  handleValidationError,
  handleDuplicateEmail,
  encrypt,
  handleBoardsSchema,
  getBackgroundSrc,
};

export default utils;
