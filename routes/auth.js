import express from "express";
import { register } from "../controllers/user";

const router = express.Router();

router.get("/register", register);

export default router;
