import Express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    createBet,
    updateBet
} from "../controllers/bets.js";

const router = Express.Router();

/* CREATE */
router.post('/createBet/:userId', verifyToken, createBet);

/* UPDATE */
router.patch('/updateBet/:userId/:betId', verifyToken, updateBet)

export default router;