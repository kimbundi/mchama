import express from "express";
import cors from "cors"
import { connectDB } from "./config/Db.js";
import loanRouter from "./routes/LoanRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'

import groupRouter from "./routes/groupRoute.js";
import memberRouter from "./routes/memberRoute.js";
import contributionRouter from "./routes/contributionRoute.js";
import bankRouter from "./routes/bankRoute.js";
import allRouter from "./routes/allRoute.js";
//app config

const app = express()
const port = process.env.PORT || 4000;

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 



// Allow requests from your frontend domain

const corsOptions = {
    origin: [
        "https://mchama-frontend.onrender.com",
        "https://mchama-adminn.onrender.com"
    ], // ✅ Allow both frontends
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Ensure methods are in array format
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Ensure headers are in array format
    credentials: true, // ✅ Allow cookies or tokens in requests
};
//use corsoptions when live on render

 app.use(cors(corsOptions));


//db connection
connectDB();

//api endpoints

app.use("/api/loan",loanRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)


app.use("/api/group",groupRouter)
app.use("/api/member",memberRouter)
app.use("/api/contribution",contributionRouter)
app.use("/api/bank",bankRouter)
app.use("/api/all",allRouter)

app.get("/",(req,res)=>{
    res.send("API working")

})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

