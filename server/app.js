import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/api/users.js";
import boardsRouter from "./routes/api/boards.js";
import { validateJWTAuth, disableCache } from "./middlewares/middlewares.js";
import { serveSwagger, setupSwagger } from "./middlewares/handleSwagger.js";
import connectDB from "./config/config-mongoose.js";
import { configDotenv } from "dotenv";

configDotenv({ path: "./environment/.env" });

const app = express();

app.use(logger("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(express.json());
app.use(disableCache);

app.use("/api-docs", serveSwagger, setupSwagger);

app.use("/api/users", usersRouter);
app.use("/api/boards", validateJWTAuth, boardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

connectDB();

export default app;
