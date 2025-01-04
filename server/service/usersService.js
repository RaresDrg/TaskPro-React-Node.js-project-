import User from "./schemas/usersSchema.js";
import bcrypt from "bcrypt";
import utils from "../utils/utils.js";

async function addUsertoDB(data) {
  await User.validate(data);

  const alreadyExistingDoc = await User.findOne({ email: data.email });
  if (alreadyExistingDoc) {
    return "user already exists";
  }

  const newUser = {
    name: data.name,
    email: data.email,
    password: utils.encrypt(data.password),
  };

  return User.create(newUser);
}

function addGoogleUserToDB(user) {
  return User.create(user);
}

async function checkUserCredentials(data) {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    return {
      isInvalid: true,
      message: "There is no account associated with this email address",
    };
  }

  if (user.isGoogleUser) {
    return {
      isInvalid: true,
      message:
        "The account associated with this email is linked with Google, so please use Google in order to authenticate",
    };
  }

  const decryptedPassword = bcrypt.compareSync(data.password, user.password);
  if (!decryptedPassword) {
    return {
      isInvalid: true,
      message: "Password is wrong",
    };
  }

  return user;
}

function findUser(data) {
  return User.findOne(data);
}

function updateUser(userId, updates) {
  return User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });
}

async function validateData(data) {
  await User.validate(data);
}

const usersService = {
  addUsertoDB,
  addGoogleUserToDB,
  findUser,
  updateUser,
  checkUserCredentials,
  validateData,
};

export default usersService;
