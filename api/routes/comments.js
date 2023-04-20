import express from "express";
import { addComment, getComments } from "../controllers/Comment.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);

export default router;
