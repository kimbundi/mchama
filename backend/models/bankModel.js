import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    provider: { type: String, required: true, trim: true }, // Ensure provider name is required
    moneyAccountName: { type: String, required: true, trim: true }, // Ensure account name is required
    moneyAccountNumber: { type: String, required: true, unique: true }, // Ensure unique account number
    initialBalance: { type: Number, default: 0, min: 0 }, // Default to 0, no negative balances
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true }, // Link to Group
}, { timestamps: true });

const Bank = mongoose.models.Bank || mongoose.model("Bank", bankSchema);
export default Bank;
