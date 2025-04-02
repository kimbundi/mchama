import { useEffect, useState } from "react";
import "./Groupstatus.css"; // Ensure you have styles for better UI
import { getAll } from "../../apis";
import { toast } from "react-toastify";

const API_URL = "https://mchama-backend.onrender.com";


const GroupStatus = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const updateStatus = async (groupId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/api/group/${groupId}/status`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error("Failed to update status");
            
            // Refresh the list after update
            fetchGroups();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p className="loading-message">Loading groups...</p>;
    if (error) return <p className="error-message">{error}</p>;

    const approvedGroups = groups.filter(group => group.status === "Approved");
    const rejectedGroups = groups.filter(group => group.status === "Rejected");
    const pendingGroups = groups.filter(group => group.status === "Pending");

    return (
        <div className="group-status-container">
            <h2 className="title">Group Status Overview</h2>

            {[{
                title: "Approved Groups", data: approvedGroups, className: "approved"
            }, {
                title: "Rejected Groups", data: rejectedGroups, className: "rejected"
            }, {
                title: "Pending Groups", data: pendingGroups, className: "pending"
            }].map(({ title, data, className }) => (
                <div key={title} className={`status-section ${className}`}>
                    <h3 className="section-title">{title} ({data.length})</h3>
                    {data.length > 0 ? (
                        <ul className="group-list">
                            {data.map(group => (
                                <li key={group._id} className="group-item">
                                    <span className="group-name">{group.groupName}</span>
                                    {className === "pending" && (
                                        <span className="group-actions">
                                            <button className="approve-btn" onClick={() => updateStatus(group._id, "Approved")}>Approve</button>
                                            <button className="reject-btn" onClick={() => updateStatus(group._id, "Rejected")}>Reject</button>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : <p className="no-groups">No {className} groups.</p>}
                </div>
            ))}
        </div>
    );
};

export default GroupStatus;
