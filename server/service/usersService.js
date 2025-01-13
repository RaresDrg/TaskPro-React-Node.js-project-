import User from "./schemas/usersSchema.js";
import bcrypt from "bcrypt";
import utils from "../utils/utils.js";

async function addUsertoDB(data) {
  await User.validate(data);

  const alreadyExistingDoc = await User.findOne({ email: data.email });

  return alreadyExistingDoc
    ? { isInvalid: true, message: "This email is already used" }
    : User.create({
        name: data.name,
        email: data.email,
        password: utils.encrypt(data.password),
      });
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

const usersService = {
  addUsertoDB,
  addGoogleUserToDB,
  findUser,
  updateUser,
  checkUserCredentials,
};

export default usersService;
