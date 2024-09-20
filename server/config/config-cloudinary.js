import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv({ path: "../environment/.env" });

const uploadOnCloudinary = async (file, fileId, fileName) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          public_id: fileId,
          display_name: fileName,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(file.buffer);
    });

    return uploadResult.secure_url;
  } catch (error) {
    return error;
  }
};

export default uploadOnCloudinary;
