const {verifyToken} = require("../utils/jwt");

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !/^Bearer\s+\S+$/.test(authHeader)){
            return res.status(401).json({
                success: false,
                message: "Authorization token missing",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid/Expired token",
        });
    }
};

module.exports = {
    authenticate
};