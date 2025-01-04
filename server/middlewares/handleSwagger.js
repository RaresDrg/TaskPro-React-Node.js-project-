import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.js";

const serveSwagger = swaggerUi.serve;
const setupSwagger = (req, res, next) => {
  swaggerUi.setup(swaggerSpec)(req, res, next);
};

export { serveSwagger, setupSwagger };
