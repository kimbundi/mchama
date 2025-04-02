import Group from "../models/groupModel.js";
import Bank from "../models/bankModel.js";
import Member from "../models/memberModel.js";
import Contribution from "../models/contributionModel.js";
import mongoose from "mongoose";

// 🟢 Add a New Group
const addGroup = async (req, res) => {
    console.log("Received group data in Backend:", req.body);

    try {
        const { groupName, memberCount, groupType, organizationRole, operationCounty, isRegistered, registrationNumber } = req.body;

        // Ensure `userId` is coming from authentication middleware (JWT)
        const userId = req.user?._id; 

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });
        }

        // Create a new group
        const newGroup = new Group({
            groupName,
            memberCount,
            groupType,
            organizationRole,
            operationCounty,
            isRegistered,
            registrationNumber: isRegistered === "yes" ? registrationNumber : null,
            userId, // Automatically assign user ID from JWT
        });

        await newGroup.save();

        res.status(201).json({ success: true, message: "Group added successfully!", group: newGroup });

    } catch (error) {
        console.error("Error adding group:", error);
        res.status(500).json({ success: false, message: "Failed to add group", error: error.message });
    }
};
const getGroups = async (req, res) => {
    try {
        const userId = req.user?._id; 
        const isAdmin = req.user?.isAdmin; // Checking if the user is an admin

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        let groups;
        if (isAdmin) {
            // Admin can fetch all groups
            groups = await Group.find();
        } else {
            // Normal user can fetch only their groups
            groups = await Group.find({ userId });
        }

        res.json({ success: true, data: groups });

    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({ success: false, message: "Failed to fetch groups", error: error.message });
    }
};
const getGroupDetails = async (req, res) => {
    try {
        console.log("Received Group ID:", req.params.groupId); 
        const groupId = req.params.groupId;

        if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ success: false, message: "Invalid or missing Group ID" });
        }

        // 🔹 Ensure user is authenticated
        const userId = req.user?._id;
        const isAdmin = req.user?.isAdmin; 

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: User must be logged in" });
        }

        // 🔹 Fetch Group Name, Owner, and Status
        const group = await Group.findById(groupId).select("groupName userId status");

        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        // 🔹 Check if the user is the owner or an admin
        if (group.userId.toString() !== userId.toString() && !isAdmin) {
            return res.status(403).json({ success: false, message: "Not authorized to access this group" });
        }

        // 🔹 Fetch Group Members
        const members = await Member.find({ group: groupId }).select("name phone role");

        // 🔹 Fetch Bank Details
        const bank = await Bank.findOne({ group: groupId }).select("provider moneyAccountName moneyAccountNumber initialBalance");

        // 🔹 Fetch Contributions
        const contributions = await Contribution.find({ group: groupId }).select("contributionName memberContribution startDate frequency invoiceMembers");

        // ✅ Send Response
        res.json({
            success: true,
            group: {
                groupName: group.groupName,
                userId: group.userId, // Include userId in response
                status: group.status, // Include status in response
            },
            members: members,
            bank: bank || null, // Return null if no bank is found
            contributions: contributions,
        });

    } catch (error) {
        console.error("❌ Error fetching group details:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 🟢 Delete a Group
const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ success: false, message: "Invalid Group ID" });
        }

        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // 🔹 Check if the group exists
        const existingGroup = await Group.findById(groupId);
        if (!existingGroup) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        // 🔹 Ensure userId exists in the group
        if (!existingGroup.userId) {
            return res.status(500).json({ success: false, message: "Group is missing owner information." });
        }

        // 🔹 Check if the user is authorized (creator or admin)
        if (existingGroup.userId?.toString() !== userId.toString() && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Not authorized to delete this group" });
        }

        // 🔹 Delete related records
        await Promise.all([
            Member.deleteMany({ group: groupId }),
            Bank.deleteOne({ group: groupId }),
            Contribution.deleteMany({ group: groupId }),
            Group.findByIdAndDelete(groupId),
        ]);

        res.json({ success: true, message: "Group and all related data deleted successfully" });

    } catch (error) {
        console.error("Error deleting group:", error);
        res.status(500).json({ success: false, message: "Failed to delete group", error: error.message });
    }
};
const getLatestGroup = async (req, res) => {
    try {
        const latestGroup = await Group.findOne().sort({ createdAt: -1 }); // Get the latest group
        if (!latestGroup) {
            return res.status(404).json({ success: false, message: "No groups found" });
        }
        res.status(200).json({ success: true, group: latestGroup });
    } catch (error) {
        console.error("Error fetching latest group:", error);
        res.status(500).json({ success: false, message: "Failed to fetch latest group" });
    }
};
const updateGroupStatus = async (req, res) => {
    try {
        // Ensure only admins can update status
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: "Access Denied: Only admins can update status" });
        }

        console.log("Request User:", req.user); // Debugging log

        const { groupId } = req.params;
        const { status } = req.body;

        // Validate status
        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const group = await Group.findByIdAndUpdate(
            groupId,
            { status },
            { new: true }
        );

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.json({ message: "Group status updated successfully", group });
    } catch (error) {
        console.error("Error updating group status:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export { getGroups, addGroup, deleteGroup, getGroupDetails,getLatestGroup,updateGroupStatus };

