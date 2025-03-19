import Contribution from "../models/contributionModel.js";


// Add a Contribution

const addContribution = async (req, res) => {
    console.log("Received Contribution Data in Backend:", req.body);
    try {
        let { contributionName, amount, startDate, frequency, invoiceMembers, groupId } = req.body;

        if (!groupId) {
            return res.status(400).json({ success: false, message: "Group ID is required" });
        }

        // Convert groupId to ObjectId
        const objectGroupId = new mongoose.Types.ObjectId(groupId);

        const contribution = new Contribution({
            contributionName,
            amount,
            startDate,
            frequency,
            invoiceMembers,
            groupId: objectGroupId // Store as ObjectId
        });

        await contribution.save();
        res.status(201).json({ success: true, message: "Contribution added successfully!", contribution });
    } catch (error) {
        console.error("Error adding contribution:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};
// Get All Contributions
const listContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find({}).populate("groupId");
        res.json({ success: true, data: contributions });
    } catch (error) {
        console.error("Error fetching contributions:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

// Remove a Contribution
const removeContribution = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Contribution ID is required" });
        }

        const contribution = await Contribution.findById(id);
        if (!contribution) {
            return res.status(404).json({ success: false, message: "Contribution not found" });
        }

        await Contribution.findByIdAndDelete(id);
        res.json({ success: true, message: "Contribution removed successfully" });
    } catch (error) {
        console.error("Error removing contribution:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

export { addContribution, listContributions, removeContribution };