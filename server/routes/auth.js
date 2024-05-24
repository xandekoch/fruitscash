import Express from "express";
import { login, register, recoverPassword } from "../controllers/auth.js";

const router = Express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/recoverPassword", recoverPassword);

export default router;