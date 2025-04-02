import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true }, 
    memberCount: { type: Number, default: 0 }, 
    groupType: { type: String, required: true }, 
    organizationRole: { type: String }, 
    operationCounty: { type: String, required: true }, 
    isRegistered: { type: Boolean, default: false },  
    registrationNumber: { type: String, default: null }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],  // Allowed values
        default: "Pending"  // Default status
    },

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }], // Reference Members
    contributions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contribution" }], // Multiple Contributions
    bankAccount: { type: mongoose.Schema.Types.ObjectId, ref: "BankAccount", default: null }, // Optional Bank Account
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
