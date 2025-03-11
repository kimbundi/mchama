import express from "express";
import cors from "cors"
import { connectDB } from "./config/Db.js";
import loanRouter from "./routes/LoanRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
//app config

const app = express()
const port = process.env.PORT || 4000;

//middleware

app.use(express.json())
app.use(cors())
//db connection
connectDB();

//api endpoints

app.use("/api/loan",loanRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("API working")

})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

