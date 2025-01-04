import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      validate: [
        {
          validator: function (v) {
            return v?.trim().length > 0;
          },
          message: "=> this field is required",
        },
        {
          validator: function (v) {
            if (this.isGoogleUser) {
              return true;
            }

            return v?.trim().length >= 3 && v?.trim().length <= 50;
          },
          message: "=> it must be between 3 and 50 characters long",
        },
      ],
      trim: true,
    },
    email: {
      type: String,
      validate: [
        {
          validator: function (v) {
            return v?.trim().length > 0;
          },
          message: "=> this field is required",
        },
        {
          validator: function (v) {
            return v && /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v.trim());
          },
          message: "=> Invalid email address",
        },
      ],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      validate: [
        {
          validator: function (v) {
            if (this.isGoogleUser) {
              return true;
            }

            return v?.length > 0;
          },
          message: "=> this field is required",
        },
        {
          validator: function (v) {
            if (this.isGoogleUser) {
              return true;
            }

            return v && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
          },
          message:
            "=> it must be at least 8 characters long and must include an uppercase, a lowercase and a digit",
        },
      ],
      default: null,
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
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    validationToken: {
      value: {
        type: String,
        default: null,
      },
      expiresAt: {
        type: Date,
        default: null,
      },
    },
  },
  { versionKey: false }
);

const User = model("user", schema);

export default User;
