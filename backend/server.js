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

app.use(cors(corsOptions));


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

