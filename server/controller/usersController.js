import usersService from "../service/usersService.js";
import utils from "../utils/utils.js";
import uploadOnCloudinary from "../config/config-cloudinary.js";
import sendEmail from "../config/config-nodemailer.js";

async function register(req, res, next) {
  try {
    const result = await usersService.addUsertoDB({ ...req.body });

    if (result?.isInvalid) {
      utils.sendFailureResponse(res, 409, result.message);
      return;
    }

    const user = result;
    const tokens = utils.generateAuthTokens(user);

    await usersService.updateUser(user.id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 201, {
      message: "User created successfully",
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const message = "Missing fields. You must enter: email and password";
      utils.sendFailureResponse(res, 400, message);
      return;
    }

    const result = await usersService.checkUserCredentials({ email, password });
    if (result?.isInvalid) {
      utils.sendFailureResponse(res, 400, result.message);
      return;
    }

    const user = result;
    const tokens = utils.generateAuthTokens(user);

    await usersService.updateUser(user.id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 200, {
      message: "Logged in successfully",
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await usersService.updateUser(req.user.id, { token: null });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    utils.sendSuccessResponse(res, 200, {
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function updateUserTheme(req, res, next) {
  try {
    const { theme } = req.body;
    if (!theme) {
      utils.sendFailureResponse(res, 400, "theme: => this field is required");
      return;
    }

    const updatedUser = await usersService.updateUser(req.user.id, { theme });

    utils.sendSuccessResponse(res, 200, {
      message: "Your profile's theme has been successfully updated",
      data: { user: utils.selectUserProperties(updatedUser) },
    });
  } catch (error) {
    next(error);
  }
}

async function updateUserProfile(req, res, next) {
  try {
    const { user } = req;
    const { name, email } = req.body;

    let updatedUser = user.isGoogleUser
      ? await usersService.updateUser(user.id, { name })
      : await usersService.updateUser(user.id, { name, email });

    if (req.file) {
      const profilePhotoUrl = await uploadOnCloudinary(req.file, user.id, name);
      updatedUser = await usersService.updateUser(user.id, { profilePhotoUrl });
    }

    utils.sendSuccessResponse(res, 200, {
      message: "Your profile has been successfully updated",
      data: { user: utils.selectUserProperties(updatedUser) },
    });
  } catch (error) {
    next(error);
  }
}

async function reachCustomerSupport(req, res, next) {
  try {
    const { comment } = req.body;
    if (!comment) {
      utils.sendFailureResponse(res, 400, "comment: => this field is required");
      return;
    }

    await sendEmail("customerSupport", req.user, comment);

    const message =
      "We have successfully received your comment. A confirmation email has been sent to you. Please, check your inbox or spam folder !";
    utils.sendSuccessResponse(res, 200, { message });
  } catch (error) {
    next(error);
  }
}

async function handleForgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      utils.sendFailureResponse(res, 400, "email: => this field is required");
      return;
    }

    const user = await usersService.findUser({ email });
    if (!user) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    if (user.isGoogleUser) {
      const message =
        "Password change not supported. The account associated with this email is linked with Google, so please use Google in order to authenticate.";
      utils.sendFailureResponse(res, 403, message);
      return;
    }

    const validationToken = utils.generateValidationToken();
    await usersService.updateUser(user.id, { validationToken });

    await sendEmail("passwordRecovery", user, validationToken.value);

    const message =
      "Password change request received. Please check your email (including spam folder) for a confirmation message.";
    utils.sendSuccessResponse(res, 200, { message });
  } catch (error) {
    next(error);
  }
}

async function updatePassword(req, res, next) {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      const message = "password: => this field is required";
      utils.sendFailureResponse(res, 400, message);
      return;
    }

    const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword);
    if (!isValid) {
      const message =
        "Password must be at least 8 characters long and must include an uppercase, a lowercase and a digit";
      utils.sendFailureResponse(res, 400, message);
      return;
    }

    const { user } = req;
    const tokens = utils.generateAuthTokens(user);

    const updates = {
      password: utils.encrypt(newPassword),
      token: tokens.refreshToken,
      validationToken: null,
    };
    await usersService.updateUser(user.id, updates);

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 200, {
      message: "Password changed successfully",
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

async function handleGoogleAuth(req, res, next) {
  try {
    const validationToken = utils.generateValidationToken();
    await usersService.updateUser(req.user.id, { validationToken });
    utils.handleRedirect(res, "success", validationToken.value);
  } catch (error) {
    utils.handleRedirect(res, "failed");
  }
}

async function getUserData(req, res, next) {
  try {
    const { user } = req;
    const tokens = utils.generateAuthTokens(user);

    await usersService.updateUser(user.id, {
      validationToken: null,
      token: tokens.refreshToken,
    });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 200, {
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

const usersController = {
  register,
  login,
  logout,
  updateUserTheme,
  updateUserProfile,
  reachCustomerSupport,
  handleForgotPassword,
  updatePassword,
  handleGoogleAuth,
  getUserData,
};

export default usersController;
