import express from "express";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ msg: "you are authorized to access this route" });
});

export default router;
