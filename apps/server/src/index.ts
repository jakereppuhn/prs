import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./utils/logger";
import { requestHandler } from "./middleware/request-handler";
import { serverRoutes } from "./routes";

const PORT = env.PORT;
const app = express();

const startServer = async () => {
  app.use(helmet());
  app.use(cors());

  app.use(requestHandler);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });

  app.use("/", serverRoutes());

  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    logger.info(`Server initialized on port ${PORT}`);
  });

  process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });
  });

  process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception:", error);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Rejection:", reason);
    process.exit(1);
  });
};

startServer();
