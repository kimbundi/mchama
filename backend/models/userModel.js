import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    phonenumber:{type:Number,required:true,unique:true, trim: true,
        match: /^(?:\+254|0)[17]\d{8}$/},
    password:{type:String,required:true},
    loanData:{type:Object, default:{}}

},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;