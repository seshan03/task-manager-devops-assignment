import express from "express";
import { getModules, createModule } from "../controllers/moduleController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getModules);
router.post("/", createModule);

export default router;