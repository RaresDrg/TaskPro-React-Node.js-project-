import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/api/users.js";
import boardsRouter from "./routes/api/boards.js";
import connectDB from "./config/config-mongoose.js";
import "dotenv/config";
import { serveSwagger, setupSwagger } from "./middlewares/handleSwagger.js";
import {
  validateJWTAuth,
  disableCache,
  handleErrorResponses,
  handleMissingRoute,
  corsMiddleware,
} from "./middlewares/middlewares.js";

const app = express();

app.use(logger("dev"));
app.use(corsMiddleware);
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(express.json());
app.use(disableCache);

app.use("/api-docs", serveSwagger, setupSwagger);
app.use("/api/users", usersRouter);
app.use("/api/boards", validateJWTAuth, boardsRouter);

app.use(handleMissingRoute);
app.use(handleErrorResponses);

connectDB();

export default app;
