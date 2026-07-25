import express from "express";
import { getLectures, createLecture } from "../controllers/lectureController.js";

const router = express.Router();

router.get("/", getLectures);
router.post("/", createLecture);

export default router;