import utils from "../utils/utils.js";

function handleMissingRoute(req, res) {
  utils.sendFailureResponse(res, 404, "Not found");
}

export default handleMissingRoute;
