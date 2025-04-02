import React, { useEffect, useState, useContext } from "react";
import { storeContext } from "../../context/Storecontext";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = ({ groupId }) => {
  const { url, token, list, currentUser } = useContext(storeContext); // Assume currentUser is available in context

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [finalGroupId, setFinalGroupId] = useState(groupId || null);
  const [groupStatus, setGroupStatus] = useState(null); // Track group status
  const [dashboardData, setDashboardData] = useState(() => {
    const storedData = localStorage.getItem(`dashboardData_${currentUser?.id}`);
    return storedData ? JSON.parse(storedData) : null;
  });

  // Update finalGroupId if it's not provided and list[0] is available
  useEffect(() => {
    if (!finalGroupId && list.length > 0) {
      setFinalGroupId(list[0]);
    }
  }, [list, finalGroupId]);

  // Fetch group data based on groupId
  useEffect(() => {
    if (!finalGroupId) return; // Avoid fetching with null groupId

    const fetchGroupData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}/api/group/${finalGroupId}/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log the response data to check the structure
        console.log("Fetched response:", response.data);

        const status = response.data.group?.status;
        setGroupStatus(status); // Set the group status

        // Handle different statuses
        if (status === "Approved") {
          setDashboardData(response.data);
          localStorage.setItem(`dashboardData_${currentUser?.id}`, JSON.stringify(response.data));
        } else if (status === "Pending") {
          setDashboardData(response.data);
          localStorage.setItem(`dashboardData_${currentUser?.id}`, JSON.stringify(response.data));
        } else if (status === "Rejected") {
          setDashboardData(response.data);
          localStorage.setItem(`dashboardData_${currentUser?.id}`, JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching group data:", error.response?.data || error.message);
        setError("Failed to load group data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [url, token, finalGroupId, currentUser]);

  // Ensure members and contributions are defined as arrays
  const members = dashboardData?.members || [];
  const contributions = dashboardData?.contributions || [];

  // Clear localStorage when logging out or switching user
  useEffect(() => {
    if (!currentUser) {
      localStorage.removeItem(`dashboardData_${currentUser?.id}`); // Clear the dashboard data when no user
    }
  }, [currentUser]);

  return (
    <div className="dashboard-container" id="dashboard">
      {isLoading ? (
        <div className="loader"></div> // Show loading spinner
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : groupStatus === "Approved" ? (
        <div>
          <h1>Welcome to the Dashboard</h1>
          <p>Group is approved ✅</p>
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            {dashboardData ? (
              <ul>
                <li><strong>Members:</strong> {members.length}</li>
                {members.length > 0 && (
                  <ul>
                    {members.map((member, index) => (
                      <li key={index}>
                        {member.name} - {member.phone} ({member.role})
                      </li>
                    ))}
                  </ul>
                )}
                <li><strong>Total Contributions:</strong> {contributions.length}</li>
                {contributions.length > 0 && (
                  <ul>
                    {contributions.map((contribution, index) => (
                      <li key={index}>
                        {contribution.contributionName} - KES {contribution.memberContribution}
                        (Frequency: {contribution.frequency}, Start Date: {new Date(contribution.startDate).toLocaleDateString()})
                      </li>
                    ))}
                  </ul>
                )}
                <li><strong>Group Type:</strong> {dashboardData.group?.groupName || "Not Provided"}</li>
              </ul>
            ) : (
              <p>No dashboard data available.</p>
            )}
          </div>
        </div>
      ) : groupStatus === "Pending" ? (
        <div className="pending-approval">
          <h2>Your group is waiting for admin approval ⏳</h2>
          <p>Please wait for admin to approve.</p>
        </div>
      ) : groupStatus === "Rejected" ? (
        <div className="rejected-group">
          <h2>Your group has been rejected ❌</h2>
          <p>Unfortunately, your group has been rejected. Please contact the admin for further details.</p>
        </div>
      ) : (
        <div className="no-group-status">
          <h2>No group status found.</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
