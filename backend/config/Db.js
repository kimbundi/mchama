import mongoose from "mongoose"


export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://mchama:mchama68mchama@cluster0.sxkm3.mongodb.net/mchama').then(()=>console.log("DB connected"));


}