import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log("Database connection successful");
  } catch (error) {
    console.log(`Database connection failed. Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
