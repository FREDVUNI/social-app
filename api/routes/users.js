import express from "express";
import { getUser, updateProfile } from "../controllers/User.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateProfile);

export default router;
