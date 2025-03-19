import express from "express"
import { getGroups,addGroup,deleteGroup } from "../controllers/groupController.js"

const groupRouter = express.Router();


groupRouter.post("/add", addGroup);  // Add a new group
groupRouter.get("/list", getGroups); // List all groups
groupRouter.post("/remove", deleteGroup); // Delete a group

export default groupRouter;