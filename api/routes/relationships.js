import express from "express";
import {
  addRelationship,
  deleteRelationship,
  getRelationships,
} from "../controllers/Relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
