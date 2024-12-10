import { Router } from "express";

export const monitorRoutes = () => {
  const router = Router();

  router.post("/", (req, res) => {
    res.status(200).json({});
  });

  router.get("/", (req, res) => {
    res.status(200).json({});
  });

  router.get("/:monitorId", (req, res) => {
    res.status(200).json({});
  });

  router.patch("/:monitorId", (req, res) => {
    res.status(200).json({});
  });

  router.delete("/:monitorId", (req, res) => {
    res.status(200).json({});
  });

  return router;
};
