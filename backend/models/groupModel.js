import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
    groupName: String,
    memberCount: Number,
    groupType: String,
    organizationRole: String,
    operationCounty: String,
    isRegistered: String,
    registrationNumber: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'member' }], // Reference Members
    contributions: { type: mongoose.Schema.Types.ObjectId, ref: 'Contribution' }, // Reference Contributions
    bankAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount' } // Reference Bank Account


})

const group = mongoose.models.group || mongoose.model("group",groupSchema)

export default group;