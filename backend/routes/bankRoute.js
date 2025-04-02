import express from 'express';
import { addBank, listBanks, removeBank } from '../controllers/bankController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const bankRouter = express.Router();

// Route to add a new bank
bankRouter.post('/add',authMiddleware, addBank);

// Route to list all banks
bankRouter.get('/list', listBanks);

// Route to remove a bank
bankRouter.post('/remove', removeBank);

export default bankRouter;
