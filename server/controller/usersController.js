import usersService from "../service/usersService.js";
import utils from "../utils/utils.js";
import uploadOnCloudinary from "../config/config-cloudinary.js";
import sendConfirmationEmail from "../config/config-sendgrid.js";
// test

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

    const token = await usersService.addUserToken(result);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "User created successfully",
      data: {
        token,
        user: {
          email: result.email,
          name: result.name,
          theme: result.theme,
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

    const result = await usersService.checkUserLoginData({ email, password });

    if (result === "email is wrong" || result === "password is wrong") {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: result,
      });
      return;
    }

    const token = await usersService.addUserToken(result);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Logged in successfully",
      data: {
        token,
        user: {
          email: result.email,
          name: result.name,
          theme: result.theme,
          profilePhotoUrl: result.profilePhotoUrl,
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

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function getCurrentUserData(req, res, next) {
  try {
    const { email, name, profilePhotoUrl, theme } = req.user;

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          name,
          email,
          profilePhotoUrl,
          theme,
        },
      },
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
    const result = await usersService.updateUser(userId, { theme });

    res.status(200).json({
      status: "succes",
      code: 200,
      message: "Your profile's theme has been successfully updated",
      data: {
        user: {
          theme: result.theme,
          name: result.name,
          email: result.email,
          profilePhotoUrl: result.profilePhotoUrl,
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

    const result = await usersService.updateUser(userId, updates);

    res.status(200).json({
      status: "succes",
      code: 200,
      message: "Your profile has been successfully updated",
      data: {
        user: {
          name: result.name,
          email: result.email,
          profilePhotoUrl: result.profilePhotoUrl,
          theme: result.theme,
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
    await sendConfirmationEmail(email, name, comment);

    res.status(200).json({
      status: "succes",
      code: 200,
      message:
        "We have successfully received your comment, and a confirmation email has been sent to you. Please, check your inbox or spam folder !",
    });
  } catch (error) {
    next(error);
  }
}

const usersController = {
  register,
  login,
  logout,
  getCurrentUserData,
  updateUserTheme,
  updateUserProfile,
  reachCustomerSupport,
};

export default usersController;
