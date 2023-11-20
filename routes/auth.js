import express from "express";
import { login ,register,deleteA} from "../controllers/admin/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register",register)
router.delete("/del", deleteA);

export default router;
