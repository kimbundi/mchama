import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Member.css"; // Import CSS file for styling
import { toast } from "react-toastify";

const API_URL = "https://mchama-backend.onrender.com";
 // Ensure HTTP is used

const GroupDetails = () => {
    const { groupId } = useParams();
    const [groupData, setGroupData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(""); // State for status update
    const [updating, setUpdating] = useState(false); // Loading state for updating

    useEffect(() => {
        if (!groupId || groupId.length !== 24) {
            setError("Invalid Group ID. Please check and try again.");
            setLoading(false);
            return;
        }

        const fetchGroupDetails = async () => {
            try {
                const token = localStorage.getItem("adminToken"); // Get token from local storage

                const response = await fetch(`${API_URL}/api/group/${groupId}/details`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: Failed to fetch group details`);
                }

                const data = await response.json();
                setGroupData(data);
                setStatus(data.group?.status || "Pending"); // Initialize status
            } catch (err) {
                setError(err.message || "Error fetching data. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [groupId]);

    // Function to update group status
    const updateStatus = async () => {
        setUpdating(true);
        try {
            const token = localStorage.getItem("adminToken");

            const response = await fetch(`${API_URL}/api/group/${groupId}/status`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });
            toast.success(`group status updated to ${status}`)

            if (!response.ok) {
                throw new Error(`Error ${response.status}: Failed to update status`);
            }

            const updatedData = await response.json();
            setGroupData(updatedData.group); // Update UI with new status
            toast.success(`group status updated to ${status}`)
        } catch (err) {
            setError(err.message || "Failed to update status.");
            toast.error("failed to update status")
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p className="loading-message">Loading group details...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="group-details-container">
            <h2 className="group-title">Group: {groupData.group?.groupName || "N/A"}</h2>
            <p><strong>Group Owner (User ID):</strong> {groupData.group?.userId || "N/A"}</p>

            {/* Status Update Section */}
            <h3>Update Group Status:</h3>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="status-dropdown">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button onClick={updateStatus} disabled={updating} className="update-btn">
                {updating ? "Updating..." : "Update Status"}
            </button>

            {/* Members Section */}
            <h3>Members:</h3>
            {groupData.members?.length > 0 ? (
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupData.members.map((member) => (
                            <tr key={member._id}>
                                <td>{member.name}</td>
                                <td>{member.role}</td>
                                <td>{member.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No members found.</p>
            )}

            {/* Bank Details Section */}
            <h3>Bank Details:</h3>
            {groupData.bank ? (
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>Provider</th>
                            <th>Account Name</th>
                            <th>Account Number</th>
                            <th>Initial Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{groupData.bank.provider}</td>
                            <td>{groupData.bank.moneyAccountName}</td>
                            <td>{groupData.bank.moneyAccountNumber}</td>
                            <td>{groupData.bank.moneyInitialBalance}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No bank details available.</p>
            )}

            {/* Contributions Section */}
            <h3>Contributions:</h3>
            {groupData.contributions?.length > 0 ? (
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>Contribution Name</th>
                            <th>Member Contribution</th>
                            <th>Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupData.contributions.map((contribution) => (
                            <tr key={contribution._id}>
                                <td>{contribution.contributionName}</td>
                                <td>{contribution.memberContribution}</td>
                                <td>{contribution.frequency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contributions found.</p>
            )}
        </div>
    );
};

export default GroupDetails;
