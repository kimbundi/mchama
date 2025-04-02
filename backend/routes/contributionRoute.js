import express from 'express';
import { addContribution, listContributions, removeContribution } from '../controllers/contributionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const contributionRouter = express.Router();

contributionRouter.post("/add",authMiddleware, addContribution);
contributionRouter.get("/list", listContributions);
contributionRouter.post("/remove", removeContribution);

export default contributionRouter;
