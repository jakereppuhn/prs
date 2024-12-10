import { Router } from "express";

import { authRoutes } from "./auth-routes";
import { machineRoutes } from "./machine-routes";
import { monitorRoutes } from "./monitor-routes";
import { scriptRoutes } from "./script-routes";
import { userRoutes } from "./user-routes";
import { utilityRoutes } from "./utility-routes";

export const serverRoutes = () => {
  const router = Router();

  router.use("/auth", authRoutes());
  router.use("/machines", machineRoutes());
  router.use("/monitors", monitorRoutes());
  router.use("/users", userRoutes());

  // Development routes
  router.use("/scripts", scriptRoutes());
  router.use("/utils", utilityRoutes());

  return router;
};
