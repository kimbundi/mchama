import mongoose from "mongoose"

const bankSchema = new mongoose.Schema({
    provider: String,
    accountName: String,
    accountNumber: String,
    initialBalance: Number,
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'group' } // Link to Group

})

const bank = mongoose.models.bank|| mongoose.model("bank",bankSchema)
export default bank