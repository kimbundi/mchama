import Member from "../models/memberModel.js";
import mongoose from "mongoose";

// 🟢 Add Members
const addMember = async (req, res) => {
    console.log("📌 Received members Data:", JSON.stringify(req.body, null, 2));

    try {
        const { rows } = req.body;
        const userId = req.user?._id; // Ensure user ID is available from JWT

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: User ID is required" });
        }

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid or empty rows" });
        }

        // 🔍 Validate groupIds and check ownership
        for (const row of rows) {
            if (!row.groupId || !mongoose.Types.ObjectId.isValid(row.groupId)) {
                return res.status(400).json({ success: false, message: `Invalid Group ID: ${row.groupId}` });
            }
        }

        // ✅ Convert and prepare for insertion
        const membersToInsert = rows.map(row => ({
            name: row.name,
            phone: row.phone,
            role: row.role,
            group: new mongoose.Types.ObjectId(row.groupId), // ✅ Convert to ObjectId
            userId, 
        }));

        console.log("✅ Members Ready for Insertion:", JSON.stringify(membersToInsert, null, 2));

        await Member.insertMany(membersToInsert);

        console.log("✅ Members added successfully");
        res.status(201).json({ success: true, message: "Members added successfully!", members: membersToInsert });

    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 🟢 Get All Members (Only User's Members)
const listMembers = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const members = await Member.find({ userId }).populate("groupId");  // Fetch only the user's members with group details

        res.json({ success: true, data: members });

    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ success: false, message: "Failed to fetch members", error: error.message });
    }
};

// 🟢 Remove a Member
const removeMember = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL parameter
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Member ID" });
        }

        // Find the member and ensure it belongs to the user
        const member = await Member.findOne({ _id: id, userId });

        if (!member) {
            return res.status(404).json({ success: false, message: "Member not found or unauthorized" });
        }

        await Member.findByIdAndDelete(id);
        res.json({ success: true, message: "Member removed successfully" });

    } catch (error) {
        console.error("Error removing member:", error);
        res.status(500).json({ success: false, message: "Failed to delete member", error: error.message });
    }
};

export { addMember, listMembers, removeMember };
