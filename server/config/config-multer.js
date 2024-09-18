import multer from "multer";
import path from "path";

const profilePhotoUploadDir = path.join(process.cwd(), "public/profile-photos");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, profilePhotoUploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileUniqueName = `${req.user.id}${fileExtension}`;

    cb(null, fileUniqueName);
  },
});

const filterProfilePhoto = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname);
  const availableExtensions = [".jpeg", ".png"];

  if (!availableExtensions.includes(fileExtension)) {
    const error = `You must enter a file with one of these extensions: ${availableExtensions.join(
      ", "
    )}`;

    cb(new Error(error));
    return;
  }

  cb(null, true);
};

const validateUploadedPhoto = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: filterProfilePhoto,
}).single("profilePhoto");

export default validateUploadedPhoto;