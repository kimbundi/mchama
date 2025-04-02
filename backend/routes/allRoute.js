import express from 'express';
import { getGroupDetails,deleteGroupAndData } from '../controllers/Allcontroller.js';

const allRouter = express.Router();

// Route to add a new bank
allRouter.get("/list/:groupId", getGroupDetails);
allRouter.post("/remove/:groupId", deleteGroupAndData);


export default allRouter;
