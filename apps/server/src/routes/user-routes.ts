import { Router } from "express";

export const userRoutes = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.status(200).json({});
  });

  router.get("/:userId", (req, res) => {
    res.status(200).json({});
  });

  router.patch("/:userId", (req, res) => {
    res.status(200).json({});
  });

  return router;
};
