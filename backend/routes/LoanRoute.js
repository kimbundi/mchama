import express from 'express'
import { addLoan, listLoan, removeLoan,updateLoanStatus,getAllLoans } from '../controllers/LoanController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/adminMiddleware.js';


const loanRouter = express.Router();



loanRouter.post("/add",authMiddleware,addLoan)


loanRouter.get("/list",authMiddleware,listLoan)
loanRouter.post("/remove",authMiddleware,removeLoan);
loanRouter.post("/update",protectAdmin,updateLoanStatus)
loanRouter.get("/all",protectAdmin,getAllLoans)









export default loanRouter;
