import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
    contributionName: String,
    amount: Number,
    startDate: Date,
    frequency: String,
    invoiceMembers: String,
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'group' } // Link to Group


})
const contribution = mongoose.models.contribution|| mongoose.model("contribution",contributionSchema)

export default contribution;