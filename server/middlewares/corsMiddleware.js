import cors from "cors";

const corsOptions = {
  origin: ["https://taskpro-umber.vercel.app", "http://localhost:5173"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
