import Express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    getBalance,
    getAffiliateData
} from "../controllers/users.js";

const router = Express.Router();

/* READ */
router.get('/getBalance/:userId', verifyToken, getBalance)
router.get('/getAffiliateData/:userId', verifyToken, getAffiliateData)

export default router;