import express from 'express';
import { addMember, listMembers, removeMember } from '../controllers/memberController.js';

const memberRouter = express.Router();

memberRouter.post("/add", addMember);   // Add a new member
memberRouter.get("/list", listMembers); // List all members
memberRouter.post("/remove", removeMember); // Remove a member

export default memberRouter;
