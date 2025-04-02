import Contribution from "../models/contributionModel.js";
import mongoose from "mongoose";

// ✅ Add a Contribution
const addContribution = async (req, res) => {
    console.log("📌 Received Contribution Data:", JSON.stringify(req.body, null, 2));

    try {
        let { contributionName, memberContribution, startDate, frequency, invoiceMembers, groupId } = req.body;
        const userId = req.user?._id; // Extract userId from authentication

        // 🔍 Validate inputs
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });
        if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ success: false, message: "Invalid or missing Group ID" });
        }

        const contribution = new Contribution({
            contributionName,
            memberContribution,
            startDate,
            frequency,
            invoiceMembers,
            group: new mongoose.Types.ObjectId(groupId), // ✅ Convert to ObjectId
            userId,
        });

        await contribution.save();
        console.log("✅ Contribution added successfully:", contribution);
        res.status(201).json({ success: true, message: "Contribution added successfully!", data: contribution });

    } catch (error) {
        console.error("❌ Error adding contribution:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Get All Contributions (Only for Authenticated User)
const listContributions = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });

        const contributions = await Contribution.find({ userId }).populate("groupId", "name");
        res.json({ success: true, data: contributions });

    } catch (error) {
        console.error("❌ Error fetching contributions:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Remove a Contribution
const removeContribution = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user?._id;

        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing Contribution ID" });
        }

        const contribution = await Contribution.findOneAndDelete({ _id: id, userId });
        if (!contribution) {
            return res.status(404).json({ success: false, message: "Contribution not found or unauthorized" });
        }

        res.json({ success: true, message: "Contribution removed successfully" });

    } catch (error) {
        console.error("❌ Error removing contribution:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export { addContribution, listContributions, removeContribution };
