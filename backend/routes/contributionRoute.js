import express from 'express';
import { addContribution, listContributions, removeContribution } from '../controllers/contributionController.js';

const contributionRouter = express.Router();

contributionRouter.post("/add", addContribution);
contributionRouter.get("/list", listContributions);
contributionRouter.post("/remove", removeContribution);

export default contributionRouter;
