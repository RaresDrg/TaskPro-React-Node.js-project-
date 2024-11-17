import multer from "multer";

const filterProfilePhoto = (req, file, cb) => {
  const fileType = file.mimetype.split("/", 1).join("");

  if (fileType !== "image") {
    cb(new Error("Please provide an image file."));
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
