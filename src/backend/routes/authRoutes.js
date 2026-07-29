import express from "express";
import { loginAdmin, googleLogin, getMe } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/google", googleLogin);
router.get("/me", authenticate, getMe);

export default router;