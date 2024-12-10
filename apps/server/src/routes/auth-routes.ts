import { Router } from "express";

export const authRoutes = () => {
  const router = Router();

  router.post("/login", (req, res) => {
    res.status(200).json({});
  });

  router.post("/logout", (req, res) => {
    res.status(200).json({});
  });

  router.post("/callback", (req, res) => {
    res.status(200).json({});
  });

  router.get("/session", (req, res) => {
    res.status(200).json({});
  });

  return router;
};
