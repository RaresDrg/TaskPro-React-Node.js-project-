import { Schema, model } from "mongoose";
import utils from "../../utils/utils.js";

const iconsOptions = utils.handleBoardsSchema("icon");
const bgOptions = utils.handleBoardsSchema("background");
const priorityOptions = utils.handleBoardsSchema("priority");

const cardSchema = new Schema({
  title: {
    type: String,
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [50, "Title must be less than 50 characters long"],
    required: [true, "=> this field is required"],
  },
  description: {
    type: String,
    trim: true,
    minlength: [5, "Description must be at least 5 characters long"],
    maxlength: [400, "Description must be less than 400 characters long"],
    required: [true, "=> this field is required"],
  },
  priority: {
    type: String,
    enum: {
      values: priorityOptions,
      message: `=> it should be one of these: ${priorityOptions.join(", ")}`,
    },
    required: [true, "=> this field is required"],
  },
  deadline: {
    type: String,
    required: [true, "=> this field is required"],
  },
});

const columnSchema = new Schema({
  title: {
    type: String,
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [50, "Title must be less than 50 characters long"],
    required: [true, "=> this field is required"],
  },
  cards: {
    type: [cardSchema],
  },
});

const schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [50, "Title must be less than 50 characters long"],
      required: [true, "=> this field is required"],
    },
    icon: {
      type: String,
      enum: {
        values: iconsOptions,
        message: `=> it should be one of these: ${iconsOptions.join(", ")}`,
      },
      required: [true, "=> this field is required"],
    },
    background: {
      value: {
        type: String,
        enum: {
          values: bgOptions,
          message: `=> it should be one of these: ${bgOptions.join(", ")}`,
        },
        required: [true, "=> this field is required"],
      },
      sources: {
        type: Object,
        default: null,
      },
    },
    columns: {
      type: [columnSchema],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false }
);

const Board = model("boards", schema);

export default Board;
