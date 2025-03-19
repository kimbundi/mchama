import group from "../models/groupModel.js";

//  Add a New Group
const addGroup = async (req, res) => {
    console.log("Received groupdata in Backend:", req.body);
    try {
        const { groupName, memberCount, groupType, organizationRole, operationCounty, isRegistered, registrationNumber } = req.body;

        // Create a new group
        const newGroup = new group({
            groupName,
            memberCount,
            groupType,
            organizationRole,
            operationCounty,
            isRegistered,
            registrationNumber: isRegistered === "yes" ? registrationNumber : null,
        });

        await newGroup.save();

        res.status(201).json({ success: true, message: "Group added successfully!", group: newGroup });

    } catch (error) {
        console.error("Error adding group:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

// 🟢 Get All Groups
const getGroups = async (req, res) => {
    try {
        const groups = await group.find({});
        res.json({ success: true, data: groups });

    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

// 🟢 Delete a Group
// 🟢 Delete a Group
const deleteGroup = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Group ID is required" });
        }

        // Use a different variable name to avoid conflict
        const existingGroup = await group.findById(id);
        if (!existingGroup) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        await group.findByIdAndDelete(id);
        res.json({ success: true, message: "Group removed successfully" });

    } catch (error) {
        console.error("Error removing group:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

export { addGroup, getGroups, deleteGroup };
