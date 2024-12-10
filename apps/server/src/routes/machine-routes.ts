import { Router } from "express";

export const machineRoutes = () => {
  const router = Router();

  router.post("/", (req, res) => {
    res.status(200).json({});
  });

  router.get("/", (req, res) => {
    res.status(200).json({});
  });

  router.get("/:machineId", (req, res) => {
    res.status(200).json({});
  });

  router.patch("/:machineId", (req, res) => {
    res.status(200).json({});
  });

  router.delete("/:machineId", (req, res) => {
    res.status(200).json({});
  });

  return router;
};
