import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import chatRoutes from "./routes/chat.routes.js";
import healthRoutes from "./routes/health.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: env.frontendOrigins,
  }),
);
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api", chatRoutes);

app.use(errorHandler);

export default app;
