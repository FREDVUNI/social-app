import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/Post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
