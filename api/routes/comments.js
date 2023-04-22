import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/Comment.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
