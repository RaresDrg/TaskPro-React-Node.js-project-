import usersService from "../service/usersService.js";
import utils from "../utils/utils.js";
import uploadOnCloudinary from "../config/config-cloudinary.js";
import sendEmail from "../config/config-nodemailer.js";

// todo: vercel
// "http://localhost:5173"
// "https://taskpro-umber.vercel.app";

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
    const tokens = utils.generateTokens(user);

    await usersService.updateUser(user.id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "User created successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          theme: user.theme,
        },
      },
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

    if (result === "email is wrong" || result === "password is wrong") {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: result,
      });
      return;
    }

    const user = result;
    const tokens = utils.generateTokens(user);

    await usersService.updateUser(user.id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Logged in successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          theme: user.theme,
          profilePhotoUrl: user.profilePhotoUrl,
        },
      },
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
      status: "succes",
      code: 200,
      message: "Your profile's theme has been successfully updated",
      data: {
        user: {
          theme: updatedUser.theme,
          name: updatedUser.name,
          email: updatedUser.email,
          profilePhotoUrl: updatedUser.profilePhotoUrl,
        },
      },
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
    const { name, email, password } = req.body;
    await usersService.validateData({ name, email, password });

    const userId = req.user.id;
    const updates = { name, email, password: utils.encrypt(password) };

    if (req.file) {
      const profilePhotoUrl = await uploadOnCloudinary(req.file, userId, name);
      updates.profilePhotoUrl = profilePhotoUrl;
    }

    const updatedUser = await usersService.updateUser(userId, updates);

    res.status(200).json({
      status: "succes",
      code: 200,
      message: "Your profile has been successfully updated",
      data: {
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          profilePhotoUrl: updatedUser.profilePhotoUrl,
          theme: updatedUser.theme,
        },
      },
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

    const { name, email } = req.user;
    await sendEmail(email, name, comment);

    res.status(200).json({
      status: "succes",
      code: 200,
      message:
        "We have successfully received your comment. A confirmation email has been sent to you. Please, check your inbox or spam folder !",
    });
  } catch (error) {
    next(error);
  }
}

async function handleGoogleAuth(req, res, next) {
  try {
    const { user } = req;
    const tokens = utils.generateTokens(user);
    await usersService.updateUser(user.id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);

    res.cookie(
      "googleAuthSuccess",
      JSON.stringify({
        email: user.email,
        name: user.name,
        theme: user.theme,
        profilePhotoUrl: user.profilePhotoUrl,
      })
    );
  } catch (error) {
    res.cookie("googleAuthError", `Google authentication failed !`);
  } finally {
    res.redirect("https://taskpro-umber.vercel.app");
  }
}

const usersController = {
  register,
  login,
  logout,
  updateUserTheme,
  updateUserProfile,
  reachCustomerSupport,
  handleGoogleAuth,
};

export default usersController;
