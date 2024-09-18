import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv({ path: "../environment/.env" });

const uploadOnCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
      public_id: file.id,
      display_name: file.owner,
    });

    return result.secure_url;
  } catch (error) {
    console.log("cacat");
  }
};

export default uploadOnCloudinary;
