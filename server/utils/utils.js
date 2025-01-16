import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import usersService from "../service/usersService.js";

function sendSuccessResponse(res, statusCode, responseBody) {
  res.status(statusCode).json({ status: "success", ...responseBody });
}

function sendFailureResponse(res, statusCode, message) {
  res.status(statusCode).json({ status: "failed", message });
}

function encrypt(text) {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const encryptedText = bcrypt.hashSync(text, salt);

  return encryptedText;
}

function handleBoardsSchema(property) {
  if (property === "icon") {
    const iconsOptions = [
      "icon-project",
      "icon-star",
      "icon-loading",
      "icon-puzzlePiece",
      "icon-container",
      "icon-lightning",
      "icon-colors",
      "icon-hexagon",
    ];

    return iconsOptions;
  }

  if (property === "background") {
    const bgOptions = [
      "bg-default",
      "bg-1",
      "bg-2",
      "bg-3",
      "bg-4",
      "bg-5",
      "bg-6",
      "bg-7",
      "bg-8",
      "bg-9",
      "bg-10",
      "bg-11",
      "bg-12",
      "bg-13",
      "bg-14",
      "bg-15",
    ];

    return bgOptions;
  }

  if (property === "priority") {
    const iconsOptions = ["low", "medium", "high", "without"];

    return iconsOptions;
  }
}

function getBackgroundSrc(background) {
  if (background === "bg-default") return null;

  const baseURL =
    "https://res.cloudinary.com/db73szjbz/image/upload/TaskPro/assets/backgrounds/";

  const backgroundSrc = {
    mobile: `${baseURL}/mobile/${background}`,
    tablet: `${baseURL}/tablet/${background}`,
    desktop: `${baseURL}/desktop/${background}`,
    mobile_2x: `${baseURL}/mobile/${background}-2x`,
    tablet_2x: `${baseURL}/tablet/${background}-2x`,
    desktop_2x: `${baseURL}/desktop/${background}-2x`,
  };

  return backgroundSrc;
}

function generateRandomBytes() {
  const token = crypto
    .randomBytes(Number(process.env.RANDOM_BYTES_LENGTH))
    .toString("hex");

  return token;
}

function generateValidationToken() {
  const validationToken = {
    value: generateRandomBytes(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  };

  return validationToken;
}

function generateAuthTokens(user) {
  const accessToken = jwt.sign(
    { email: user.email, id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );
  const refreshToken = generateRandomBytes();

  const tokens = { accessToken, refreshToken };
  return tokens;
}

function sendTokensAsCookies(res, tokens) {
  const { accessToken, refreshToken } = tokens;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "None",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "None",
  });
}

async function getUserByRefreshToken(req) {
  const refreshToken = req?.signedCookies?.refreshToken ?? null;
  if (!refreshToken) {
    throw new Error("Refresh token missing. Please re-login !");
  }

  const user = await usersService.findUser({ token: refreshToken });
  if (!user) {
    throw new Error("Invalid refresh token. Please re-login !");
  }

  return user;
}

function handleRedirect(res, variant, validationToken = null) {
  let searchParams;

  if (variant === "failed") {
    searchParams = `googleAuthFailed=Google authentication failed !`;
  }

  if (variant === "success") {
    searchParams = `googleAuthSuccess=${validationToken}`;
  }

  res.redirect(`https://taskpro-umber.vercel.app/?${searchParams}`);
}

function selectUserProperties(user) {
  return {
    email: user.email,
    name: user.name,
    theme: user.theme,
    profilePhotoUrl: user.profilePhotoUrl,
    isGoogleUser: user.isGoogleUser,
  };
}

function checkDeadline(deadline) {
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today <= deadlineDate;
}

const utils = {
  sendSuccessResponse,
  sendFailureResponse,
  encrypt,
  handleBoardsSchema,
  getBackgroundSrc,
  generateRandomBytes,
  generateValidationToken,
  generateAuthTokens,
  sendTokensAsCookies,
  getUserByRefreshToken,
  handleRedirect,
  selectUserProperties,
  checkDeadline,
};

export default utils;
