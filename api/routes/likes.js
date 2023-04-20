import express from "express";
import { addLike, deleteLike, getLikes } from "../controllers/Like.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", deleteLike);

export default router;
