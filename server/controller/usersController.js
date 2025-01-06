import usersService from "../service/usersService.js";
import utils from "../utils/utils.js";
import uploadOnCloudinary from "../config/config-cloudinary.js";
import sendEmail from "../config/config-nodemailer.js";

async function register(req, res, next) {
  try {
    const result = await usersService.addUsertoDB({ ...req.body });

    if (result === "user already exists") {
      res.status(409).json({
        status: "failed",
        code: 409,
        message: "This email is already used",
      });
      return;
    }

    const user = result;
    const tokens = utils.generateAuthTokens(user);

    await usersService.updateUser(user.id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "User created successfully",
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const hasAllRequiredFields = email && password;

    if (!hasAllRequiredFields) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Missing fields. You must enter: email and password",
      });
      return;
    }

    const result = await usersService.checkUserCredentials({ email, password });
    if (result?.isInvalid) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: result.message,
      });
      return;
    }

    const user = result;
    const tokens = utils.generateAuthTokens(user);

    await usersService.updateUser(user.id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    res.status(200).json({
      status: "success",
      code: 200,
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

    res.status(200).json({
      status: "success",
      code: 200,
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
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "theme: => this field is required",
      });
      return;
    }

    const userId = req.user.id;
    const updatedUser = await usersService.updateUser(userId, { theme });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Your profile's theme has been successfully updated",
      data: { user: utils.selectUserProperties(updatedUser) },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

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

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Your profile has been successfully updated",
      data: { user: utils.selectUserProperties(updatedUser) },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

    if (error.codeName === "DuplicateKey") {
      utils.handleDuplicateEmail(res);
      return;
    }

    next(error);
  }
}

async function reachCustomerSupport(req, res, next) {
  try {
    const { comment } = req.body;
    if (!comment) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "comment: => this field is required",
      });
      return;
    }

    await sendEmail("customerSupport", req.user, comment);

    res.status(200).json({
      status: "success",
      code: 200,
      message:
        "We have successfully received your comment. A confirmation email has been sent to you. Please, check your inbox or spam folder !",
    });
  } catch (error) {
    next(error);
  }
}

async function handleForgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Email field is required. Please provide your account email.",
      });
      return;
    }

    const user = await usersService.findUser({ email });
    if (!user) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    if (user.isGoogleUser) {
      res.status(403).json({
        status: "failed",
        code: 403,
        message:
          "Password change not supported. The account associated with this email is linked with Google, so please use Google in order to authenticate.",
      });
      return;
    }

    const validationToken = utils.generateValidationToken();
    await usersService.updateUser(user.id, { validationToken });

    await sendEmail("passwordRecovery", user, validationToken.value);

    res.status(200).json({
      status: "success",
      code: 200,
      message:
        "Password change request received. Please check your email (including spam folder) for a confirmation message.",
    });
  } catch (error) {
    next(error);
  }
}

async function updatePassword(req, res, next) {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Missing password field",
      });
      return;
    }

    const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword);
    if (!isValid) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message:
          "Password must be at least 8 characters long and must include an uppercase, a lowercase and a digit",
      });
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
    res.status(200).json({
      status: "success",
      code: 200,
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
    res.status(200).json({
      status: "success",
      code: 200,
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
