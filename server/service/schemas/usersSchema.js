import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters long"],
      required: [true, "=> this field is required"],
    },
    email: {
      type: String,
      match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email address"],
      required: [true, "=> this field is required"],
      unique: true,
    },
    password: {
      type: String,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "=> Password must be at least 8 characters long and must include an uppercase, a lowercase and a digit",
      ],
      required: [true, "=> this field is required"],
    },
    token: {
      type: String,
      default: null,
    },
    profilePhotoUrl: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      default: "violet",
      enum: {
        values: ["light", "dark", "violet"],
        message: "=> is either: light, dark or violet",
      },
    },
  },
  { versionKey: false }
);

const User = model("user", schema);

export default User;
