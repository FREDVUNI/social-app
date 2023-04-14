import express from "express";
const router = express.Router();
import { login, register, logout } from "../controllers/Auth.js";

router.post("/signup", register);
router.post("/signin", login);
router.post("/signout", logout);

export default router;
