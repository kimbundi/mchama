import mongoose from "mongoose"

const memberSchema= new mongoose.Schema({
    name: String,
    phone: String,
    role: String,
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'group' } // Link to Group

})

const member = mongoose.models.member || mongoose.model("member",memberSchema)
export default member