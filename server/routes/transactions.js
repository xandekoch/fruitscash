import Express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    createDeposit,
    createWithdraw,
    createAffiliateWithdraw
} from "../controllers/transactions.js";

const router = Express.Router();

/* CREATE */
router.post("/createDeposit/:userId", verifyToken, createDeposit);
router.post("/createWithdraw/:userId", verifyToken, createWithdraw);
router.post("/createAffiliateWithdraw/:userId", verifyToken, createAffiliateWithdraw);

/* READ */

/* UPDATE */

/* DELETE */

export default router;