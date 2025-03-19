import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protectAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Access Denied: Not an Admin" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

export { protectAdmin };
