import express from "express";
import { getUser, updateProfile } from "../controllers/User.js";

const router = express.Router();

router.get("/", getUser);
router.patch("/", updateProfile);

export default router;
