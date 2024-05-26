import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
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

        const adminId = decoded.id;
        
        if (req.params.adminId !== adminId) {
            console.log(adminId);
            return res.status(403).json({ error: "Unauthorized" });
        }

        const isAdmin = decoded.isAdmin;
        console.log('isAdmin', isAdmin)
        
        if (!isAdmin) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        next();
    } catch (err) {
        res.status(500).json({error: "Token is not valid"});
    }
}
