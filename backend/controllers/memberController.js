import Member from "../models/memberModel.js";
import mongoose from "mongoose";

//add member

const addMember = async (req, res) => {
    console.log("📌 Received members  Data:", JSON.stringify(req.body, null, 2));

    try {
        const { rows } = req.body;

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid or empty rows" });
        }

        // 🔍 Check for missing groupId before mapping
        const missingGroupId = rows.some(row => !row.groupId);
        if (missingGroupId) {
            return res.status(400).json({ success: false, message: "Group ID is required" });
        }

        // 🔍 Validate all groupIds before inserting
        for (const row of rows) {
            console.log(`🔍 Checking groupId: ${row.groupId}`);
            if (!mongoose.Types.ObjectId.isValid(row.groupId)) {
                return res.status(400).json({ success: false, message: `Invalid Group ID: ${row.groupId}` });
            }
        }

        // ✅ Convert and prepare for insertion
        const membersToInsert = rows.map(row => ({
            name: row.name,
            phone: row.phone,
            role: row.role,
            groupId: new mongoose.Types.ObjectId(row.groupId), // ✅ Convert to ObjectId
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

// Get all members
const listMembers = async (req, res) => {
    try {
        const members = await Member.find({}).populate("groupId");  // Fetch with group details
        res.json({ success: true, data: members });

    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

// Remove a member
const removeMember = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Member ID is required" });
        }

        const member = await Member.findById(id);
        if (!member) {
            return res.status(404).json({ success: false, message: "Member not found" });
        }

        await Member.findByIdAndDelete(id);
        res.json({ success: true, message: "Member removed successfully" });

    } catch (error) {
        console.error("Error removing member:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

export { addMember, listMembers, removeMember };
