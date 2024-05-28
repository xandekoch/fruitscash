import Express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    createDeposit,
    createWithdraw,
    createAffiliateWithdraw,
    getWithdrawals,
} from "../controllers/transactions.js";
import { generatePaymentCode, webhookPix } from "../middleware/suitPay.js";

const router = Express.Router();

/* CREATE */
router.post("/generatePaymentCode/:userId", verifyToken, generatePaymentCode);
router.post("/createDeposit", webhookPix, createDeposit);

router.post("/createWithdraw/:userId", verifyToken, createWithdraw);
router.post("/createAffiliateWithdraw/:userId", verifyToken, createAffiliateWithdraw);


/* READ */
router.get("/getWithdrawals/:userId", verifyToken, getWithdrawals);

/* UPDATE */

/* DELETE */

export default router;