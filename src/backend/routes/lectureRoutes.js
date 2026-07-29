import express from "express";
import {
  getLectures,
  createLecture,
  getLectureById,
  updateLecture,
  deleteLecture,
} from "../controllers/lectureController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getLectures);
router.post("/", createLecture);
router.get("/:id", getLectureById);
router.put("/:id", updateLecture);
router.delete("/:id", deleteLecture);

export default router;