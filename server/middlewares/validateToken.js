import usersService from "../service/usersService.js";

async function validateToken(req, res, next) {
  try {
    const { validationToken } = req.query;
    if (!validationToken || validationToken === "undefined") {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Validation token missing.",
      });
      return;
    }

    const user = await usersService.findUser({
      "validationToken.value": validationToken,
    });

    if (!user) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    if (user.validationToken.expiresAt < new Date()) {
      res.status(403).json({
        status: "failed",
        code: 403,
        message: "Validation token is expired",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: `Internal server error. ${error}` });
  }
}

export default validateToken;
