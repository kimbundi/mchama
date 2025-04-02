import Group from "../models/groupModel.js";
import Member from "../models/memberModel.js";
import Bank from "../models/bankModel.js";
import Contribution from "../models/contributionModel.js";

export const getGroupDetails = async (req, res) => {
    try {
        const { groupId } = req.params; // Get groupId from request params

        if (!groupId) {
            return res.status(400).json({ success: false, message: "Group ID is required" });
        }

        // Fetch all related data in parallel
        const [group, members, banks, contributions] = await Promise.all([
            Group.findById(groupId), // Fetch group details
            Member.find({ groupId }), // Fetch all members of the group
            Bank.find({ groupId }), // Fetch bank details associated with the group
            Contribution.find({ groupId }) // Fetch all contributions of the group
        ]);

        // Return all data
        res.status(200).json({
            success: true,
            data: {
                group,
                members,
                banks,
                contributions
            }
        });

    } catch (error) {
        console.error("Error fetching group details:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

// Function to delete a group and its related data
export const deleteGroupAndData = async (req, res) => {
    try {
        const { groupId } = req.params; // Get groupId from request params

        if (!groupId) {
            return res.status(400).json({ success: false, message: "Group ID is required" });
        }

        // Delete all associated data
        const [deletedGroup, deletedMembers, deletedBanks, deletedContributions] = await Promise.all([
            Group.findByIdAndDelete(groupId),
            Member.deleteMany({ groupId }),
            Bank.deleteMany({ groupId }),
            Contribution.deleteMany({ groupId })
        ]);

        res.status(200).json({
            success: true,
            message: "Group and all associated data deleted successfully",
            deleted: {
                group: deletedGroup,
                membersDeleted: deletedMembers.deletedCount,
                banksDeleted: deletedBanks.deletedCount,
                contributionsDeleted: deletedContributions.deletedCount
            }
        });

    } catch (error) {
        console.error("Error deleting group and data:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};
