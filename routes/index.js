import express from "express";
import userRouter from "./auth.js";
import testRoute from "./test.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/test", testRoute);

export default router;
