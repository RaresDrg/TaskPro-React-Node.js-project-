import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const uploadOnCloudinary = async (file, userId, name) => {
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
          public_id: userId,
          display_name: name,
          asset_folder: "TaskPro/users",
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

    console.log("File successfully uploaded to Cloudinary");
    return uploadResult.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

export default uploadOnCloudinary;
