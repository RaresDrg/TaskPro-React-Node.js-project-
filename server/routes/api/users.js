import express from "express";
import usersController from "../../controller/usersController.js";
import {
  validateJWTAuth,
  validateGoogleAuth,
  validateUploadedPhoto,
} from "../../middlewares/middlewares.js";

const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.delete("/logout", validateJWTAuth, usersController.logout);
router.post("/support", validateJWTAuth, usersController.reachCustomerSupport);
router.patch("/theme", validateJWTAuth, usersController.updateUserTheme);
router.put(
  "/profile",
  [validateJWTAuth, validateUploadedPhoto],
  usersController.updateUserProfile
);

router.get("/google-auth", validateGoogleAuth.redirect);
router.get(
  "/google-auth/callback",
  validateGoogleAuth.handleCallback,
  usersController.handleGoogleAuth
);

export default router;
