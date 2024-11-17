import multer from "multer";
import path from "path";

const filterProfilePhoto = (req, file, cb) => {
  console.log(file);
  const fileExtension = path.extname(file.originalname);
  const availableExtensions = [".jpeg", ".png"];

  if (!availableExtensions.includes(fileExtension)) {
    const extensionsString = availableExtensions.join(", ");
    const error = `You must enter a file with one of these extensions: ${extensionsString}`;

    cb(new Error(file));
    return;
  }

  cb(null, true);
};

const validateUploadedPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5000000 },
  fileFilter: filterProfilePhoto,
}).single("profilePhoto");

export default validateUploadedPhoto;
