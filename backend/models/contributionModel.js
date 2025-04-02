import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
    contributionName: { type: String, required: true }, // Required field
    memberContribution: { type: Number, required: true, min: 1 }, // Ensure amount is positive
    startDate: { type: Date, default: Date.now }, // Default to current date if not provided
    frequency: { type: String, enum: ["daily", "weekly", "monthly", "yearly"], required: true }, // Restrict to valid options
    invoiceMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }], // Link to members who must contribute
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true }, // Link to Group
}, { timestamps: true });

const Contribution = mongoose.models.Contribution || mongoose.model("Contribution", contributionSchema);

export default Contribution;
