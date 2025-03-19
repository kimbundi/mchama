import Bank from "../models/bankModel.js";

// Add a new bank
const addBank = async (req, res) => {
    try {
        const bank = new Bank({
            provider: req.body.provider,
            accountName: req.body.accountName,
            accountNumber: req.body.accountNumber,
            initialBalance: req.body.initialBalance,
            groupId: req.body.groupId
        });

        await bank.save();
        res.status(201).json({ success: true, message: "Bank added successfully!", bank });
    } catch (error) {
        console.error("Error adding bank:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

// List all banks
const listBanks = async (req, res) => {
    try {
        const banks = await Bank.find({});
        res.json({ success: true, data: banks });
    } catch (error) {
        console.error("Error fetching banks:", error);
        res.status(500).json({ success: false, message: "Error retrieving banks" });
    }
};

// Remove a bank
const removeBank = async (req, res) => {
    try {
        const bank = await Bank.findById(req.body.id);
        if (!bank) {
            return res.status(404).json({ success: false, message: "Bank not found" });
        }

        await Bank.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Bank removed successfully" });
    } catch (error) {
        console.error("Error removing bank:", error);
        res.status(500).json({ success: false, message: "Error removing bank" });
    }
};

export { addBank, listBanks, removeBank };
