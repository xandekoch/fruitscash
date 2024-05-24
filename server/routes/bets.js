import Express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    createBet,
} from "../controllers/users.js";

const router = Express.Router();

/* CREATE */
router.post("/createBet/:userId",verifyToken, createBet);

/* READ */

/* UPDATE */

/* DELETE */

export default router;