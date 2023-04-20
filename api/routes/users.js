import express from "express";
import { getUser } from "../controllers/User.js";

const router = express.Router();

router.get("/", getUser);

export default router;
