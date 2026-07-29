import express from "express";
import {
  getAssignments,
  createAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getAssignments);
router.post("/", createAssignment);
router.get("/:id", getAssignmentById);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;