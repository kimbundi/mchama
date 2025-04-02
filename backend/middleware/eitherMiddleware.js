import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protectEither = async (req, res, next) => {
    try {
        // Get the token from headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No Token Provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user (whether admin or normal user)
        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User/Admin not found" });
        }

        // Attach the user to req object
        req.user = user;
        
        console.log(`✅ ${user.isAdmin ? "Admin" : "User"} authenticated:`, user);

        next();
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export default protectEither;
