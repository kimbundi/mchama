import express from 'express'
import { addLoan, listLoan, removeLoan } from '../controllers/LoanController.js'


const loanRouter = express.Router();



loanRouter.post("/add",addLoan)


loanRouter.get("/list",listLoan)
loanRouter.post("/remove",removeLoan);









export default loanRouter;
