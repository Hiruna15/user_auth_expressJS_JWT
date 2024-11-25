import express from "express";
import verifyAndRefreshTokenMiddleware from "../middlewares/verifyAndRefreshToken .js";

const router = express.Router();

router.get("/protected", verifyAndRefreshTokenMiddleware, (req, res) => {
  res.status(200).json({ msg: "you are authorized to access this route" });
});

export default router;
