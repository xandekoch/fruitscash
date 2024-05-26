import Express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    getBalance,
} from "../controllers/users.js";

const router = Express.Router();

/* READ */
router.get('/getBalance/:userId', verifyToken, getBalance)

/* UPDATE */

/* DELETE */

export default router;