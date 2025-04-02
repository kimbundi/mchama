import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name is required
    phone: { type: String, required: true, unique: true }, // Ensure unique phone numbers
    role: { type: String, default: "Member" }, // Default role is "Member"
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true }, // Link to Group
}, { timestamps: true }); // Automatically adds createdAt & updatedAt fields

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
