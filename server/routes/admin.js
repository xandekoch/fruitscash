import Express from "express";
import {
    createUser,
    getUsers,
    getTransactions,
    setInfluencer,
    setBalance,
    releaseWithdraw
} from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";

const router = Express.Router();

/* CREATE */
router.post('/createUser/:adminId', isAdmin, createUser);

/* READ */
router.get('/getUsers/:adminId', isAdmin, getUsers)
router.get('/getTransactions/:adminId', isAdmin, getTransactions)

/* UPDATE */
router.patch('/setInfluencer/:adminId/:userId', isAdmin, setInfluencer);
router.patch('/setBalance/:adminId/:userId', isAdmin, setBalance);
router.patch('/releaseWithdraw/:adminId', isAdmin, releaseWithdraw);


/* DELETE */

export default router;