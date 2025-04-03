import { Router } from "express";
import { login, register, logout } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware);
router.post("/logout", logout);

export default router;
