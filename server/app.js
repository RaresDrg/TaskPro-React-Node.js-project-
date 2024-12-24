import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import usersRouter from "./routes/api/users.js";
import boardsRouter from "./routes/api/boards.js";
import { validateJWTAuth, disableCache } from "./middlewares/middlewares.js";
import { configDotenv } from "dotenv";

configDotenv({ path: "./environment/.env" });

const app = express();

app.use(logger("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(express.json());
app.use(disableCache);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", usersRouter);
app.use("/api/boards", validateJWTAuth, boardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const connection = mongoose.connect(process.env.DB_HOST);
connection
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(`Database connection failed. Error: ${error}`);
    process.exit(1);
  });

export default app;
