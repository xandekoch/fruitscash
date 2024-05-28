import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        
        if (!token) {
            return res.status(401).json({error: "You need to Login"});
        }

        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length).trim();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded || !decoded.id) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            return res.status(401).json({ error: "Token expirado" });
        }

        const userId = decoded.id;''
        
        if (req.params.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        next();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
