import express from "express";
import usersController from "../../controller/usersController.js";
import validateAuth from "../../config/config-passport.js";
import validateUploadedPhoto from "../../config/config-multer.js";

const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.delete("/logout", validateAuth, usersController.logout);
router.get("/current", validateAuth, usersController.getCurrentUserData);
router.post("/support", validateAuth, usersController.reachCustomerSupport);
router.patch("/theme", validateAuth, usersController.updateUserTheme);
router.put(
  "/profile",
  [validateAuth, validateUploadedPhoto],
  usersController.updateUserProfile
);

export default router;
