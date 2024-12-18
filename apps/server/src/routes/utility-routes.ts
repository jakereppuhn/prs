import { AppError } from "../middleware/error-handler";
import { Router } from "express";

export const utilityRoutes = () => {
  const router = Router();

  router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  router.get("/error-test", (_req, _res) => {
    throw new AppError(400, "This is a test error");
  });

  return router;
};
