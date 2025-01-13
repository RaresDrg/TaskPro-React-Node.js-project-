import utils from "../utils/utils.js";

function handleErrorResponses(err, req, res, next) {
  if (err?.name === "ValidationError") {
    utils.sendFailureResponse(res, 400, err.message);
    return;
  }

  if (err?.codeName === "DuplicateKey") {
    const message = "You can't use this email. It belongs to another account";
    utils.sendFailureResponse(res, 409, message);
    return;
  }

  if (err?.name === "CastError") {
    utils.sendFailureResponse(res, 400, "Invalid id value");
    return;
  }

  console.error(err);
  utils.sendFailureResponse(res, 500, "Interal server error");
}

export default handleErrorResponses;
