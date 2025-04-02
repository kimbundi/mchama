import express from "express"
import { getGroups ,deleteGroup ,getGroupDetails ,addGroup, getLatestGroup, updateGroupStatus}  from "../controllers/groupController.js"
import authMiddleware from "../middleware/authMiddleware.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";
import protectEither from "../middleware/eitherMiddleware.js";

const groupRouter = express.Router();


groupRouter.post("/add",authMiddleware, addGroup);  // Add a new group
groupRouter.get("/list",protectAdmin, getGroups); // List all groups

groupRouter.delete("/:groupId/delete",protectAdmin, deleteGroup);
groupRouter.get("/latest",getLatestGroup)

groupRouter.get("/:groupId/details", protectEither,  getGroupDetails);
groupRouter.put("/:groupId/status", protectAdmin, updateGroupStatus);


export default groupRouter;