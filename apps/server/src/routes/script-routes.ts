import { Router } from "express";

export const scriptRoutes = () => {
  const router = Router();

  router.post("/deploy", (req, res) => {
    res.status(200).json({});
  });

  return router;
};
