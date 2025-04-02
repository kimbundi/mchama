import Bank from "../models/bankModel.js";

import mongoose from "mongoose";

// ✅ Add a New Bank
const addBank = async (req, res) => {
    console.log("Received group data in Backend:", req.body);
    try {
        const userId = req.user?._id; // Extract userId from authentication
        let { provider,moneyAccountName, moneyAccountNumber, initialBalance, groupId } = req.body;

        // 🔍 Validate inputs
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });
        if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ success: false, message: "Invalid or missing Group ID" });
        }

        const bank = new Bank({
            provider,
            moneyAccountName,
            moneyAccountNumber,
            initialBalance,
            group: new mongoose.Types.ObjectId(groupId), // ✅ Convert to ObjectId
            userId,
        });

        await bank.save();
        res.status(201).json({ success: true, message: "Bank added successfully!", data: bank });

    } catch (error) {
        console.error("❌ Error adding bank:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ List All Banks (Only for Authenticated User)
const listBanks = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });

        const banks = await Bank.find({ userId }).populate("groupId", "name");
        res.json({ success: true, data: banks });

    } catch (error) {
        console.error("❌ Error fetching banks:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Remove a Bank
const removeBank = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user?._id;

        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing Bank ID" });
        }

        const bank = await Bank.findOneAndDelete({ _id: id, userId });
        if (!bank) {
            return res.status(404).json({ success: false, message: "Bank not found or unauthorized" });
        }

        res.json({ success: true, message: "Bank removed successfully" });

    } catch (error) {
        console.error("❌ Error removing bank:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export { addBank, listBanks, removeBank };
