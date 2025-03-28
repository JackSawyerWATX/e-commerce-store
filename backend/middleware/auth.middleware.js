import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!accessToken) {
            return res.status(401).json({ message: "You need to be logged in to visit this route. " });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(404).json({ message: "No user found with this ID. " });
            }

            req.user = user;
            next();

        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized - Expired access token. " });
            }
        }
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        return res.status(401).json({ message: "Unauthorized - Invalid access token. ", error: error.message });
    }
};

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Unauthorized - Admin only route. " });
    }
};