import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteGroup, getAll } from "../../apis";
import "./Group.css"; // Import the CSS file
import { toast,ToastContainer } from "react-toastify";


const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchGroups = async () => {
        try {
            const response = await getAll();
            console.log("API Response:", response);

            const data = response.success ? response : await response.json();
            console.log("Data:", data);

            setGroups(data.data);
        } catch (err) {
            console.error("Error fetching groups:", err);
            setError("Error fetching groups");
            toast.error("Failed to load groups!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleViewGroup = (groupId) => {
        console.log(groupId);
        navigate(`/groups/${groupId}`);
    };

    const handleDelete = async (groupId) => {
        if (!window.confirm("Are you sure you want to delete this group?")) return;
        try {
            const response = await deleteGroup(groupId);
            if (response.success) {
                toast.success("Group deleted successfully!");
                fetchGroups(); // Refresh list
            } else {
                toast.error("Error deleting group");
            }
        } catch (error) {
            toast.error("Error deleting group: " + error.message);
        }
    };

    if (loading) return <p className="loading-message">Loading groups...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="groups-container">
            <h2 className="dashboard-title">Admin Dashboard - Groups</h2>
            <ToastContainer position="top-right" autoClose={3000} />
            
            {groups.length === 0 ? (
                <p className="no-groups">No groups found.</p>
            ) : (
                <table className="groups-table">
                    <thead>
                        <tr>
                            <th>Group Name</th>
                            <th>Type</th>
                            <th>Members</th>
                            <th>Role</th>
                            <th>County</th>
                            <th>Action</th>
                            <th>Danger</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group) => (
                            <tr key={group._id}>
                                <td>{group.groupName}</td>
                                <td>{group.groupType}</td>
                                <td>{group.memberCount}</td>
                                <td>{group.organizationRole}</td>
                                <td>{group.operationCounty}</td>
                                <td>
                                    <button className="view-button" onClick={() => handleViewGroup(group._id)}>
                                        View Details
                                    </button>
                                </td>
                                <td>
                                    <button className="delete" onClick={() => handleDelete(group._id)}>
                                        Delete Group
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Groups;
