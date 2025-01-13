import usersService from "../service/usersService.js";
import utils from "../utils/utils.js";

async function validateToken(req, res, next) {
  try {
    const { validationToken } = req.query;
    if (!validationToken || validationToken === "undefined") {
      utils.sendFailureResponse(res, 400, "Validation token missing.");
      return;
    }

    const user = await usersService.findUser({
      "validationToken.value": validationToken,
    });

    if (!user) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    if (user.validationToken.expiresAt < new Date()) {
      utils.sendFailureResponse(res, 403, "Validation token is expired");
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    utils.sendFailureResponse(res, 500, "Internal server error");
  }
}

export default validateToken;
