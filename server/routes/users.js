import Express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    getUser,
} from "../controllers/users.js";

const router = Express.Router();

/* READ */
router.get("/:userId",verifyToken, getUser);

/* UPDATE */

/* DELETE */

export default router;